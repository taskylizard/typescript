import type { FlatESLintConfigItem } from "eslint-define-config";
import globals from "globals";

export const browser: FlatESLintConfigItem[] = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      /**
       * Disallow await inside of loops.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-await-in-loop
       */
      "no-await-in-loop": "error",
      /**
       * Disallow the use of console.
       *
       * 🚫 Not fixable - https://eslint.org/docs/rules/no-console
       */
      "no-console": "error",
    },
  },
];
