import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

test("version is 0.2.8", () => {
  assert.equal(pkg.version, "0.2.8");
});

test("author and homepage point to johnnycsh.com", () => {
  assert.equal(pkg.author.name, "Johnny Sánchez");
  assert.equal(pkg.author.url, "https://www.johnnycsh.com");
  assert.equal(pkg.homepage, "https://www.johnnycsh.com");
});

test("repository stays on GitHub", () => {
  assert.equal(pkg.repository.url, "https://github.com/JohnnyC-SH/DotNet_convenience.git");
});

test("explorer context includes project reference on folders and csproj", () => {
  const menus = pkg.contributes.menus["explorer/context"];
  const entry = menus.find((m) => m.command === "dotnetConv.addProjectReference");
  assert.ok(entry, "addProjectReference missing from explorer/context");
  assert.match(entry.when, /explorerResourceIsFolder/);
  assert.match(entry.when, /resourceExtname == \.csproj/);
});

test("explorer context includes new project on folders and sln", () => {
  const menus = pkg.contributes.menus["explorer/context"];
  const entry = menus.find((m) => m.command === "dotnetConv.newProjectInSolution");
  assert.ok(entry, "newProjectInSolution missing from explorer/context");
  assert.match(entry.when, /explorerResourceIsFolder/);
  assert.match(entry.when, /resourceExtname == \.sln/);
});
