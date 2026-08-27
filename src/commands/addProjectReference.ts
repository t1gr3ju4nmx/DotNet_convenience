import * as vscode from "vscode";
import * as path from "node:path";
import { findAllCsproj, resolveTargetDirectory } from "../workspace";
import { runDotnetWithOutput } from "../dotnetCli";
import { isCsprojPath, orderWithSuggestedFirst, pickSuggestedCsproj } from "../resourcePick";

function uriFor(fsPath: string, projects: vscode.Uri[]): vscode.Uri {
  return projects.find((p) => path.resolve(p.fsPath) === path.resolve(fsPath)) ?? vscode.Uri.file(fsPath);
}

export function registerAddProjectReference(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "dotnetConv.addProjectReference",
    async (resource?: vscode.Uri) => {
      try {
        const projects = await findAllCsproj();
        if (projects.length < 2) {
          vscode.window.showErrorMessage(
            vscode.l10n.t(
              "At least two projects (.csproj) are required in the workspace to add a reference.",
            ),
          );
          return;
        }

        const projectPaths = projects.map((p) => p.fsPath);
        const anchor = resource ?? (await resolveTargetDirectory(undefined));
        const suggestedPath = pickSuggestedCsproj(anchor.fsPath, projectPaths);
        const orderedFrom = orderWithSuggestedFirst(projectPaths, suggestedPath).map((p) =>
          uriFor(p, projects),
        );

        let fromUri: vscode.Uri | undefined;
        if (resource && isCsprojPath(resource.fsPath) && suggestedPath) {
          fromUri = uriFor(suggestedPath, projects);
        } else {
          const fromPick = await vscode.window.showQuickPick(
            orderedFrom.map((p) => ({
              label: vscode.workspace.asRelativePath(p),
              description: path.basename(p.fsPath),
              uri: p,
            })),
            {
              title: vscode.l10n.t("Project that will receive the reference"),
              placeHolder: suggestedPath
                ? vscode.l10n.t("Suggested above: {0}", vscode.workspace.asRelativePath(uriFor(suggestedPath, projects)))
                : vscode.l10n.t("Choose a .csproj"),
            },
          );
          if (!fromPick) {
            return;
          }
          fromUri = fromPick.uri;
        }

        const candidates = projects.filter((p) => path.resolve(p.fsPath) !== path.resolve(fromUri!.fsPath));
        const toPick = await vscode.window.showQuickPick(
          candidates.map((p) => ({
            label: vscode.workspace.asRelativePath(p),
            description: path.basename(p.fsPath),
            uri: p,
          })),
          {
            title: vscode.l10n.t("Referenced project"),
            placeHolder: vscode.l10n.t("Pick the other .csproj"),
          },
        );
        if (!toPick) {
          return;
        }

        const args = ["add", fromUri.fsPath, "reference", toPick.uri.fsPath];
        await runDotnetWithOutput(args, undefined, "dotnet add reference");
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        vscode.window.showErrorMessage(msg);
      }
    },
  );
  context.subscriptions.push(disposable);
}
