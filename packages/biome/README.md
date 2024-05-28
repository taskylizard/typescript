# @taskylizard/biome-config

![npm (scoped)](https://img.shields.io/npm/v/%40taskylizard/biome-config?logo=npm&logoColor=%23c0caf5%20&label=%20&labelColor=%2316181d&color=%23f7768e&link=https%3A%2F%2Fnpmjs.com%2Fpackage%2F%40taskylizard%2Fbiome-config)

## Usage

### Installation

```bash
npm|yarn|pnpm|bun add -D @biomejs/biome @taskylizard/biome-config
```

Add the `extends` array to your project's `biome.json` file:

```jsonc
// <project-root>/biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": "@taskylizard/biome-config"
  // ...
}
```

Add scripts to your `package.json` if you haven't already:

```jsonc
// <project-root>/package.json
{
    //...
    "scripts": {
            "format": "biome format . --write",
            "lint": "biome lint .",
            "lint:fix": "biome lint . --apply",
            "lint:fix:unsafe": "biome lint . --apply-unsafe"
        }
    }
    // ...
}
```

### Visual Studio Code Setup

1. Install the
   [BiomeJS Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
   if you haven't already.

2. Add the following settings to your project's `.vscode/settings.json`, or
   create them anew:

```jsonc
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
```
