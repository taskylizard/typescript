import type { FlatESLintConfigItem } from "eslint-define-config";

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../glob";
import { parserJSON, pluginJSON } from "../plugins";

export const jsonc: FlatESLintConfigItem[] = [
  {
    plugins: {
      jsonc: pluginJSON as any,
    },
  },
  {
    // These allow comments (a.k.a. JSONC files)
    files: ["**/tsconfig*.json", "**/turbo.json", `**/*.jsonc`],
    rules: { "jsonc/no-comments": "off" },
  },
  {
    // Special rules for package.json
    files: ["**/package.json"],
    rules: {
      "jsonc/sort-keys": [
        "error",
        {
          // Defines order of root properties
          order: [
            "name",
            "version",
            "private",
            "scripts",
            "description",
            "keywords",
            "homepage",
            "bugs",
            "license",
            "author",
            "types",
            "main",
            "bin",
            "directories",
            "exports",
            "peerDependencies",
            "dependencies",
            "devDependencies",
            "engines",
            "files",
            "workspaces",
            { order: { type: "desc" } }, // Force other properties to go last
          ],
          pathPattern: "^$",
        },
        // Reinstate normal order for non-root properties
        { order: { type: "asc" }, pathPattern: ".*" },
      ],
    },
  },
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    languageOptions: {
      parser: parserJSON,
    },
    rules: {
      // Standardizes order (no need to think or worry about the “best” order)
      // and reduces merge conflicts. Feel free to`"eslint-disable`.
      "jsonc/sort-array-values": ["error", { order: { type: "asc" }, pathPattern: ".*" }],
      "jsonc/no-bigint-literals": "error",
      "jsonc/no-binary-expression": "error",
      "jsonc/no-binary-numeric-literals": "error",
      "jsonc/no-dupe-keys": "error",
      "jsonc/no-escape-sequence-in-identifier": "error",
      "jsonc/no-floating-decimal": "error",
      "jsonc/no-hexadecimal-numeric-literals": "error",
      "jsonc/no-infinity": "error",
      "jsonc/no-multi-str": "error",
      "jsonc/no-nan": "error",
      "jsonc/no-number-props": "error",
      "jsonc/no-numeric-separators": "error",
      "jsonc/no-octal": "error",
      "jsonc/no-octal-escape": "error",
      "jsonc/no-octal-numeric-literals": "error",
      "jsonc/no-parenthesized": "error",
      "jsonc/no-plus-sign": "error",
      "jsonc/no-regexp-literals": "error",
      "jsonc/no-sparse-arrays": "error",
      "jsonc/no-template-literals": "error",
      "jsonc/no-undefined-value": "error",
      "jsonc/no-unicode-codepoint-escapes": "error",
      "jsonc/no-useless-escape": "error",
      "jsonc/space-unary-ops": "error",
      "jsonc/valid-json-number": "error",
    },
  },
];
