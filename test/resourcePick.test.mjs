import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { join } from "node:path";
import { test } from "node:test";

const require = createRequire(import.meta.url);
const { orderWithSuggestedFirst, pickSuggestedCsproj, pickSuggestedSln } = require("../out/resourcePick.js");

const root = join("/tmp", "sln");
const web = join(root, "src", "Web", "Web.csproj");
const core = join(root, "src", "Core", "Core.csproj");
const sln = join(root, "App.sln");
const otherSln = join(root, "tools", "Tools.sln");

test("pickSuggestedCsproj uses the clicked csproj", () => {
  assert.equal(pickSuggestedCsproj(core, [web, core]), core);
});

test("pickSuggestedCsproj walks from a folder to the project file", () => {
  const folder = join(root, "src", "Web", "Controllers");
  assert.equal(pickSuggestedCsproj(folder, [web, core]), web);
});

test("pickSuggestedSln uses the clicked sln", () => {
  assert.equal(pickSuggestedSln(otherSln, [sln, otherSln]), otherSln);
});

test("pickSuggestedSln finds the sln in the clicked folder", () => {
  assert.equal(pickSuggestedSln(root, [sln, otherSln]), sln);
});

test("orderWithSuggestedFirst puts the clicked item first", () => {
  assert.deepEqual(orderWithSuggestedFirst([web, core], core), [core, web]);
});
