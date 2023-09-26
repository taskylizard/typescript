import { execa } from "execa";

export function generatePackageJson(name: string): string {
  return `{
  "name": "${name}",
  "type": "module",
  "version": "0.0.0",
  "license": "MIT",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "lint": "eslint . -f pretty --cache",
    "format": "prettier -w --cache \"**/*.{ts,tsx,mdx,json,astro}\" ",
    "build": "tsup src/index.ts --format esm --clean --dts"
  },
  "devDependencies": {
    "@types/node": "^20.6.3",
    "@taskylizard/eslint-config": "latest"
  },
  "dependencies": {}
}`;
}

export function generateEslintConfig(): string {
  return `// @ts-check
import tasky from "@taskylizard/eslint-config";

export default tasky();`;
}

export function generateMITLicense(): string {
  return `MIT License

Copyright (c) ${new Date().getFullYear()} taskylizard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
}

export function generateTsconfig(): string {
  return `{
  "compilerOptions": {
    "target": "es2020",
    "module": "es2020",
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "esModuleInterop": true,
    "strict": true,
    "noUnusedLocals": true,
    "skipLibCheck": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}`;
}

async function git(key: string): Promise<string> {
  const { stdout } = await execa("git", ["config", "--get", key]);
  return stdout;
}

// Inspired from crystal init app
export async function generateReadme(name: string): Promise<string> {
  return `# ${name}

TODO: Write a description here

## Usage

TODO: Write usage instructions here

## Development

TODO: Write development instructions here

## Contributing

1. Fork it (<https://github.com/${await git("user.name")}/${name}/fork>)
2. Create your feature branch (\`git checkout -b my-new-feature\`)
3. Commit your changes (\`git commit -am 'Add some feature'\`)
4. Push to the branch (\`git push origin my-new-feature\`)
5. Create a new Pull Request

## Contributors

- [${await git("user.name")}](https://github.com/${await git(
    "user.name",
  )}) - creator and maintainer`;
}

const gitignore = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.vercel",
  "**/.idea",
  "**/.output",
  "**/.vite-inspect",
  "**/*.min.*",
  "**/__snapshots__",
  "**/auto-import?(s).d.ts",
  "**/components.d.ts",
];

export function getGitignore(): string {
  return gitignore.join("\n");
}
