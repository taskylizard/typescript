import { mkdir, writeFile } from "node:fs/promises";
import { defineCommand } from "citty";
import { join, resolve } from "pathe";
import consola from "consola";
import {
  generateEslintConfig,
  generateMITLicense,
  generatePackageJson,
  generateReadme,
  generateTsconfig,
  getGitignore,
} from "../template";

export default defineCommand({
  meta: {
    name: "scaffold",
    description: "Scaffold a project.",
  },
  args: {
    name: {
      type: "positional",
      required: true,
      description: "Name of the project.",
    },
    out: {
      type: "positional",
      default: ".",
      description: "Output directory.",
    },
  },
  async run({ args }) {
    const outdir = resolve(args.out, args.name);
    await mkdir(outdir);
    await mkdir(resolve(outdir, "src"));
    // TODO: refactor this
    await Promise.all([
      await writeFile(
        resolve(outdir, "package.json"),
        generatePackageJson(args.name),
      ),
      await writeFile(
        resolve(outdir, "eslint.config.js"),
        generateEslintConfig(),
      ),
      await writeFile(resolve(outdir, "tsconfig.json"), generateTsconfig()),
      await writeFile(
        resolve(outdir, "README.md"),
        await generateReadme(args.name),
      ),
      await writeFile(resolve(outdir, ".gitignore"), getGitignore()),
      await writeFile(resolve(outdir, "LICENSE"), generateMITLicense()),
      await writeFile(
        resolve(join(outdir, "src", "index.ts")),
        `console.log("hi")`,
      ),
    ]);
    consola.success("Successfully scaffolded a project.");
  },
});
