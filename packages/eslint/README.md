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
- Astro rules
- Jest rules
- JavaScript/TypeScript rules (prefixed with `ts/`)
- Ignores common files you want to ignore anyway

Start by creating a _flat_ eslint config (`eslint.config.js`):

```js
// @ts-check - important!
import tasky from "@taskylizard/eslint-config";

export default tasky();
```

Enable React/Astro/Jest/JavaScript support:

```js
// @s-check
import tasky from "@taskylizard/eslint-config";

export default tasky({
  /** Disabled by default. */
  react: true,
  jest: true,
  astro: true,
  /** TypeScript is enabled by default. */
  typescript: false,
});
```

or compose however you want:

```js
// @ts-check
import { javascript, node } from "@taskylizard/eslint-config";
import { anything, something } from "some-other-config";

export default [...node, ...javascript, ...something, ...anything];
```

---

Copyright (c) 2023 taskylizard. MIT Licensed.
