import type { FlatESLintConfigItem } from 'eslint-define-config'

import {
  astro,
  browser,
  html,
  ignore,
  imports,
  javascript,
  jest,
  jsdoc,
  jsonc,
  JSX11y,
  markdown,
  node,
  prettier,
  react,
  stylistic,
  typescript,
  unicorn,
  vue,
  yaml,
  comments,
  perfectionist,
  unocss
} from './config'
import type { ConfigOptions } from './types'

/**
 * Combine array and non-array configs into a single array.
 */
function combine(
  ...configs: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
): FlatESLintConfigItem[] {
  return configs.flatMap((config) =>
    Array.isArray(config) ? config : [config]
  )
}

export function tasky(
  options: ConfigOptions & FlatESLintConfigItem = {},
  ...userConfig: (FlatESLintConfigItem | FlatESLintConfigItem[])[]
): FlatESLintConfigItem[] {
  const configs = [
    ignore,
    javascript,
    imports,
    unicorn,
    node,
    jsdoc,
    prettier,
    stylistic,
    comments,
    // Enabled manually
    perfectionist
  ]
  if (options.typescript ?? true) configs.push(typescript)
  if (options.markdown ?? true) configs.push(markdown)
  if (options.html ?? true) configs.push(html)
  if (options.jsonc ?? true) configs.push(jsonc)
  if (options.yaml ?? true) configs.push(yaml)

  if (options.browser) configs.push(browser)
  if (options.vue) configs.push(vue)
  if (options.react) configs.push(react, JSX11y)
  if (options.astro) configs.push(astro)
  if (options.jest) configs.push(jest)
  if (options.unocss) configs.push(unocss)

  return combine(...configs, ...userConfig)
}
