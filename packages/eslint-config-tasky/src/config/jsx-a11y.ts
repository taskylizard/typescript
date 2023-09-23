import type { FlatESLintConfigItem } from "eslint-define-config";

import { pluginJSXA11y } from "../plugins";

export const JSX11y: FlatESLintConfigItem[] = [
  {
    plugins: {
      a11y: pluginJSXA11y,
    },
    rules: {
      // This rule has been deprecated, but not yet removed.
      "a11y/no-onchange": "off",
    },
  },
];
