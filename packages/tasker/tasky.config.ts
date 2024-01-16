import fsp from "node:fs/promises";
import { defineConfig } from "@taskylizard/tasker";

export default defineConfig({
  build: {
    config: {
      name: "tasker",
      copy: [{ from: "templates", to: "dist/templates" }],
      // hooks: {
      //   "build:done": async ({ options }) => {
      //     await fsp.cp("templates", `${options.outDir}/templates`, {
      //       recursive: true,
      //     });
      //   },
      // },
    },
  },
});
