# typescript

This repository contains my personal tools and configs for TypeScript, React, testing, etc.

## @taskylizard/eslint-config

```sh
pnpm add -D eslint @taskylizard/eslint-config prettier
```

Contains:

- Pretty formatter (`eslint-formatter-pretty`)
- Unicorn rules
- React/React Hooks/JSXa11y rules
- Node.js rules
- JSDoc rules
- Markdown rules
- JavaScript/TypeScript rules (prefixed with `ts/`)
- Ignores common files you want to ignore anyway
- Formats with Prettier

Then make a _flat_ eslint config (`eslint.config.js`):

```js
import tasky from "@taskylizard/eslint-config";

export default tasky();
```

Enable react support:

```js
import tasky from "@taskylizard/eslint-config";

export default tasky({ react: true });
```

---

Copyright (c) 2023 taskylizard. MIT Licensed.
