export interface ConfigOptions {
  /** TypeScript support. */
  typescript?: boolean
  /** Browser support. Enables/disables a few browser specific rules.*/
  browser?: boolean
  /** Markdown support. */
  markdown?: boolean
  /** JSONc support. */
  jsonc?: boolean
  /** YAML support. */
  yaml?: boolean
  /** HTML support.*/
  html?: boolean
  /** Jest support. */
  jest?: boolean
  /** React support. */
  react?: boolean
  /** Vue support. */
  vue?: boolean
  /** Astro support. */
  astro?: boolean
  /** UnoCSS support. */
  unocss?: boolean
}
