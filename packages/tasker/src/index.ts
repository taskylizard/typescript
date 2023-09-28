#!/usr/bin/env node
/* eslint-disable unicorn/prefer-top-level-await */
import { defineCommand, runMain, type CommandDef } from "citty";
import pkg from "../package.json";

const _def = (r: any): Promise<CommandDef> =>
  (r.default || r) as Promise<CommandDef>;

const main = defineCommand({
  meta: {
    name: "💐 tasker",
    description: pkg.description,
    version: pkg.version,
  },
  subCommands: {
    scaffold: import("./commands/scaffold").then(_def),
    barrel: import("./commands/barrel").then(_def),
  },
});

runMain(main);
