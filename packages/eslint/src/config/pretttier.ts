import { type FlatESLintConfigItem } from "eslint-define-config";
import { configPrettier } from "../plugins";

export const prettier: FlatESLintConfigItem[] = [
  {
    rules: {
      ...configPrettier.rules,
      "prettier/prettier": "warn",
    },
  },
];
