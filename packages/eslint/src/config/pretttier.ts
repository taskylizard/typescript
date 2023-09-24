import { type FlatESLintConfigItem } from "eslint-define-config";

import { configPrettier, pluginPrettier } from "../plugins";

export const prettier: FlatESLintConfigItem[] = [
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      "prettier/prettier": "warn",
    },
  },
];
