import { readFile, writeFile } from "node:fs/promises";

const config = await readFile("./biome.json", "utf8");

let readme = `# @taskylizard/biome-config

![npm (scoped)](https://img.shields.io/npm/v/%40taskylizard/biome-config?logo=npm&logoColor=%23c0caf5%20&label=%20&labelColor=%2316181d&color=%23f7768e&link=https%3A%2F%2Fnpmjs.com%2Fpackage%2F%40taskylizard%2Fbiome-config)

## Usage

### Installation

\`\`\`bash
npm|yarn|pnpm|bun add -D @biomejs/biome @taskylizard/biome-config
\`\`\`

Add the \`extends\` array to your project's \`biome.json\` file:

\`\`\`jsonc
// <project-root>/biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": "@taskylizard/biome-config"
  // ...
}
\`\`\`

Add scripts to your \`package.json\` if you haven't already:

\`\`\`jsonc
// <project-root>/package.json
{
    //...
    "scripts": {
            "format": "biome format . --write",
            "lint": "biome lint .",
            "lint:fix": "biome lint . --write",
            "lint:fix:unsafe": "biome lint . --unsafe"
        }
    }
    // ...
}
\`\`\`

### Visual Studio Code Setup

1. Install the
   [BiomeJS Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
   if you haven't already.

2. Add the following settings to your project's \`.vscode/settings.json\`, or
   create them anew:

\`\`\`jsonc
// <project-root>/.vscode/settings.json
{
  // ...
  "[javascript][javascriptreact][typescript][typescriptreact][json][jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
  // ...
}
\`\`\`

### Rules

The follow rules are enabled by default for a out-of-the-box experience.
`;

const rules = JSON.parse(config).linter.rules;

const stringifyObject = (obj: Record<string, any>) =>
  Object.entries(obj)
    .map(([key, value]) => `${key}:${stringifyObject(value)}`)
    .join(",");

for (const [key, values] of Object.entries(rules).filter(
  ([key, _]) => key !== "recommended",
)) {
  readme += `
<details>
  <summary>${key}</summary>
  ${Object.entries(values as any)
      .map(
        ([key, value]) =>
          `- ${key} — \`${value !== null && typeof value === "object" ? "See config object in biome.json" : `${value}`}\` `,
      )
      .join("\n\t")}
</details>\n`;
}

await writeFile("./README.md", readme);
