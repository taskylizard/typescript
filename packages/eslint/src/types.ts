import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'
import type { Linter } from 'eslint'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { RuleOptions } from './typegen'

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

export type PrettierOptions = Partial<PrettierOptionsRequired>

export interface PrettierOptionsRequired {
  /**
   * Specify the line length that the printer will wrap on.
   * @default 120
   */
  printWidth: number
  /**
   * Specify the number of spaces per indentation-level.
   */
  tabWidth: number
  /**
   * Indent lines with tabs instead of spaces
   */
  useTabs?: boolean
  /**
   * Print semicolons at the ends of statements.
   */
  semi: boolean
  /**
   * Use single quotes instead of double quotes.
   */
  singleQuote: boolean
  /**
   * Use single quotes in JSX.
   */
  jsxSingleQuote: boolean
  /**
   * Print trailing commas wherever possible.
   */
  trailingComma: 'none' | 'es5' | 'all'
  /**
   * Print spaces between brackets in object literals.
   */
  bracketSpacing: boolean
  /**
   * Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being
   * alone on the next line (does not apply to self closing elements).
   */
  bracketSameLine: boolean
  /**
   * Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line.
   * @deprecated use bracketSameLine instead
   */
  jsxBracketSameLine: boolean
  /**
   * Format only a segment of a file.
   */
  rangeStart: number
  /**
   * Format only a segment of a file.
   * @default Number.POSITIVE_INFINITY
   */
  rangeEnd: number
  /**
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer.
   * In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out.
   * @default "preserve"
   */
  proseWrap: 'always' | 'never' | 'preserve'
  /**
   * Include parentheses around a sole arrow function parameter.
   * @default "always"
   */
  arrowParens: 'avoid' | 'always'
  /**
   * Provide ability to support new languages to prettier.
   */
  plugins: Array<string | any>
  /**
   * How to handle whitespaces in HTML.
   * @default "css"
   */
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore'
  /**
   * Which end of line characters to apply.
   * @default "lf"
   */
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr'
  /**
   * Change when properties in objects are quoted.
   * @default "as-needed"
   */
  quoteProps: 'as-needed' | 'consistent' | 'preserve'
  /**
   * Whether or not to indent the code inside <script> and <style> tags in Vue files.
   * @default false
   */
  vueIndentScriptAndStyle: boolean
  /**
   * Enforce single attribute per line in HTML, Vue and JSX.
   * @default false
   */
  singleAttributePerLine: boolean
}

export type BuiltInParserName =
  | 'acorn'
  | 'angular'
  | 'babel-flow'
  | 'babel-ts'
  | 'babel'
  | 'css'
  | 'espree'
  | 'flow'
  | 'glimmer'
  | 'graphql'
  | 'html'
  | 'json-stringify'
  | 'json'
  | 'json5'
  | 'less'
  | 'lwc'
  | 'markdown'
  | 'mdx'
  | 'meriyah'
  | 'scss'
  | 'typescript'
  | 'vue'
  | 'yaml'

// This utility is here to handle the case where you have an explicit union
// between string literals and the generic string type. It would normally
// resolve out to just the string type, but this generic LiteralUnion maintains
// the intellisense of the original union.
//
// It comes from this issue: microsoft/TypeScript#29729:
//   https://github.com/microsoft/TypeScript/issues/29729#issuecomment-700527227
export type LiteralUnion<T extends U, U = string> =
  | T
  | (Pick<U, never> & { _?: never | undefined })

export type Awaitable<T> = T | Promise<T>

export type Rules = RuleOptions

export type TypedFlatConfigItem = Omit<Linter.FlatConfig, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>

  /**
   * An object containing a name-value mapping of rules to use.
   */
  rules?: Linter.RulesRecord & Rules
}

export interface OptionsFiles {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[]
}

export interface OptionsVue extends OptionsOverrides {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions

  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: 2 | 3
}

export type OptionsTypescript =
  | (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides)

export interface OptionsFormatters {
  /**
   * Enable formatting support for CSS, Less, Sass, and SCSS.
   *
   * Currently only support Prettier.
   */
  css?: boolean

  /**
   * Enable formatting support for HTML.
   *
   * Currently only support Prettier.
   */
  html?: boolean

  /**
   * Enable formatting support for Markdown.
   *
   * Support both Prettier and dprint.
   *
   * When set to `true`, it will use Prettier.
   */
  markdown?: boolean

  /**
   * Custom options for Prettier.
   *
   * By default it's controlled by our own config.
   */
  prettierOptions?: PrettierOptions

  /**
   * Custom options for dprint.
   *
   * By default it's controlled by our own config.
   */
  dprintOptions?: boolean

  /**
   * Enable formatting support for Astro.
   *
   * Currently only support Prettier.
   */
  astro?: 'prettier' | boolean
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[]
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsHasTypeScript {
  typescript?: boolean
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig
  extends Pick<
    StylisticCustomizeOptions,
    'indent' | 'quotes' | 'jsx' | 'semi'
  > {}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}

export interface OptionsUnoCSS extends OptionsOverrides {
  /**
   * Enable attributify support.
   * @default true
   */
  attributify?: boolean
  /**
   * Enable strict mode by throwing errors about blocklisted classes.
   * @default false
   */
  strict?: boolean
}

export interface OptionsConfig extends OptionsComponentExts {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * Core rules. Can't be disabled.
   */
  javascript?: OptionsOverrides

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript

  /**
   * Enable JSX related rules.
   *
   * Currently only stylistic rules are included.
   *
   * @default true
   */
  jsx?: boolean

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean | OptionsOverrides

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OptionsOverrides

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsOverrides

  /**
   * Enable Astro support.
   *
   * Requires installing:
   * - `eslint-plugin-astro`
   *
   * Requires installing for formatting .astro:
   * - `prettier-plugin-astro`
   *
   * @default false
   */
  astro?: boolean | OptionsOverrides

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: boolean | OptionsOverrides

  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | (StylisticConfig & OptionsOverrides)

  /**
   * Enable react rules.
   *
   * Requires installing:
   * - `eslint-plugin-react`
   * - `eslint-plugin-react-hooks`
   * - `eslint-plugin-react-refresh`
   *
   * @default false
   */
  react?: boolean | OptionsOverrides
  /**
   * Enable solid rules.
   *
   * Requires installing:
   * - `eslint-plugin-solid`
   *
   * @default false
   */
  solid?: boolean | OptionsOverrides

  /**
   * Enable unocss rules.
   *
   * Requires installing:
   * - `@unocss/eslint-plugin`
   *
   * @default false
   */
  unocss?: boolean | OptionsUnoCSS

  /**
   * Enable browser rules.
   *
   * @default false
   */
  browser?: boolean

  /**
   * Use external formatters to format files.
   *
   * Requires installing:
   * - `eslint-plugin-format`
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default false
   */
  formatters?: boolean | OptionsFormatters

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean

  /**
   * Automatically rename plugins in the config.
   *
   * @default true
   */
  autoRenamePlugins?: boolean

  /**
   * Provide overrides for rules for each integration.
   *
   * @deprecated use `overrides` option in each integration key instead
   */
  overrides?: {
    stylistic?: TypedFlatConfigItem['rules']
    javascript?: TypedFlatConfigItem['rules']
    typescript?: TypedFlatConfigItem['rules']
    test?: TypedFlatConfigItem['rules']
    vue?: TypedFlatConfigItem['rules']
    jsonc?: TypedFlatConfigItem['rules']
    markdown?: TypedFlatConfigItem['rules']
    yaml?: TypedFlatConfigItem['rules']
    toml?: TypedFlatConfigItem['rules']
    react?: TypedFlatConfigItem['rules']
  }
}
