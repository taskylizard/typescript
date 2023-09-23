# typescript

[![Style Guide](https://img.shields.io/badge/Style%20Guide-16181d?style=flat&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iZW1vamkiIHZpZXdCb3g9IjAgMCA3MiA3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBpZD0iY29sb3IiPgogICAgPHBhdGggZmlsbD0iI0VBNUE0NyIgc3Ryb2tlPSJub25lIiBkPSJNMzguMTYzMSwxNi44MjQ2YzAsMC01LjE5MDEtMC41MTM1LTUuODYyNSwzLjA0NDJzMS43NTcsNi40OTc5LDIuOTMxMyw2LjY1NTYgYzAsMC0yLjU1NjIsNi4yOTM5LDEuODcyNSw5LjY5MzVzOS4xNjExLDEuMTkxMSwxMC45NzUyLTIuMTIxNmMwLDAsOC4wODQ2LDAuOTY2NSw4LjQzOTYtNi40NTc3YzAsMC0wLjk2NDEtNi40MjM5LTUuODY1Mi02LjI5MzEgYzAs] • ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white))

This repository contains my personal tools and configs for TypeScript, React, testing, etc.

## eslint-config-tasky

```sh
pnpm add -D eslint eslint-config-tasky prettier
```

Then make a _flat_ eslint config (`eslint.config.js`):

```js
import tasky from "eslint-config-tasky";

export default tasky();
```

Copyright (c) 2023 taskylizard. MIT Licensed.
