import * as path from "node:path";

export function isCsprojPath(fsPath: string): boolean {
  return path.extname(fsPath).toLowerCase() === ".csproj";
}

export function isSlnPath(fsPath: string): boolean {
  return path.extname(fsPath).toLowerCase() === ".sln";
}

function samePath(a: string, b: string): boolean {
  return path.resolve(a) === path.resolve(b);
}

function startDirectory(resourceFsPath: string, fileExtCheck: (p: string) => boolean): string {
  if (fileExtCheck(resourceFsPath) || path.extname(resourceFsPath) !== "") {
    return path.dirname(resourceFsPath);
  }
  return resourceFsPath;
}

function pickNearestInTree(startFsPath: string, candidates: string[]): string | undefined {
  let dir = startFsPath;
  for (let hops = 0; hops < 64; hops++) {
    const match = candidates.find((candidate) => samePath(path.dirname(candidate), dir));
    if (match) {
      return match;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return undefined;
    }
    dir = parent;
  }
  return undefined;
}

export function pickSuggestedCsproj(
  resourceFsPath: string | undefined,
  projectFsPaths: string[],
): string | undefined {
  if (!resourceFsPath || projectFsPaths.length === 0) {
    return undefined;
  }
  const exact = projectFsPaths.find((p) => samePath(p, resourceFsPath));
  if (exact) {
    return exact;
  }
  return pickNearestInTree(startDirectory(resourceFsPath, isCsprojPath), projectFsPaths);
}

export function pickSuggestedSln(
  resourceFsPath: string | undefined,
  slnFsPaths: string[],
): string | undefined {
  if (!resourceFsPath || slnFsPaths.length === 0) {
    return undefined;
  }
  const exact = slnFsPaths.find((p) => samePath(p, resourceFsPath));
  if (exact) {
    return exact;
  }
  return pickNearestInTree(startDirectory(resourceFsPath, isSlnPath), slnFsPaths);
}

export function orderWithSuggestedFirst(items: string[], suggested: string | undefined): string[] {
  if (!suggested) {
    return items;
  }
  if (!items.some((item) => samePath(item, suggested))) {
    return items;
  }
  return [suggested, ...items.filter((item) => !samePath(item, suggested))];
}
