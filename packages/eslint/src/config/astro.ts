import type { FlatESLintConfigItem } from "eslint-define-config";

import { GLOB_ASTRO } from "../glob";
import { parserAstro, pluginAstro } from "../plugins";

export const astro: FlatESLintConfigItem[] = [
  {
    files: [GLOB_ASTRO],
    plugins: {
      astro: pluginAstro as any,
    },
    languageOptions: {
      parser: parserAstro,
    },
    rules: {
      ...(pluginAstro.configs.recommended.rules as any),
    },
  },
];
