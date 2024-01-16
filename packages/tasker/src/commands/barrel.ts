import { defineCommand } from "citty";
import { resolve } from "pathe";
import { consola } from "consola";
import { barrel } from "../core/barrel";

export default defineCommand({
  meta: {
    name: "barrel",
    description: "Generate barrels (index.ts).",
  },
  args: {
    dir: {
      type: "positional",
      required: true,
      description: "The directory path.",
    },
  },
  async run({ args }) {
    const outdir = resolve(args.dir);
    await barrel(outdir).catch((error) => consola.error(error));
    consola.success(`Successfully made barrel in ${outdir}.`);
  },
});
