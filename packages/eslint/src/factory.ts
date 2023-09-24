import type { FlatESLintConfigItem } from "eslint-define-config";

import {
  astro,
  ignore,
  imports,
  javascript,
  jest,
  jsdoc,
  JSX11y,
  markdown,
  node,
  prettier,
  react,
  typescript,
  unicorn,
} from "./config";
import type { ConfigOptions } from "./types";

/**
 * Combine array and non-array configs into a single array.
 */
function combine(
  ...configs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
): FlatESLintConfigItem[] {
  return configs.flatMap((config) => (Array.isArray(config) ? config : [config]));
}

export function tasky(
  options: ConfigOptions & FlatESLintConfigItem = {},
  ...userConfig: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
): FlatESLintConfigItem[] {
  const configs = [ignore, javascript, imports, unicorn, node, jsdoc, prettier];
  if (options.typescript ?? true) configs.push(typescript);

  if (options.react) configs.push(react, JSX11y);
  if (options.astro) configs.push(astro);
  if (options.jest) configs.push(jest);

  if (options.markdown ?? true) configs.push(markdown);

  return combine(...configs, ...userConfig);
}
