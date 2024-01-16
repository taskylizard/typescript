import { mkdir, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineCommand } from "citty";
import { dirname, join, resolve } from "pathe";
import { logger } from "../core/utils";
import { generateMITLicense, generateReadme } from "src/core/template/utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineCommand({
  meta: {
    name: "init",
    description: "Create a project.",
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
    const p = await logger.prompt("Select a template:", {
      type: "select",
      options: [
        { label: "TypeScript (basic)", value: "ts-basic" },
        { label: "TypeScript (monorepo)", value: "ts-monorepo" },
      ],
    });
    const dir = resolve(args.out, args.name);
    await mkdir(dir);
    // TODO: refactor this
    await Promise.all([
      await cp(join(__dirname, p.value), dir, { recursive: true }),
      // await writeFile(
      //   resolve(outdir, "package.json"),
      //   generatePackageJson(args.name),
      // ),
      await writeFile(
        resolve(dir, "README.md"),
        await generateReadme(args.name),
      ),
      await writeFile(resolve(dir, "LICENSE"), generateMITLicense()),
    ]);
    logger.success("Successfully scaffolded a project.");
  },
});
