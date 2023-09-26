export function generatePackageJson(name: string) {
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

export function generateEslintConfig() {
  return `// @ts-check
import tasky from "@taskylizard/eslint-config";

export default tasky();`;
}

export function generateMITLicense() {
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

export function generateTsconfig() {
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
