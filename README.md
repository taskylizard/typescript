# typescript

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

---

Copyright (c) 2023 taskylizard. MIT Licensed.
