import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../glob'
import { parserJSON, pluginJSON } from '../plugins'

export const jsonc: Config = [
  {
    plugins: {
      jsonc: pluginJSON as any
    }
  },
  {
    // These allow comments (a.k.a. JSONC files)
    files: ['**/tsconfig*.json', '**/turbo.json', `**/*.jsonc`],
    rules: { 'jsonc/no-comments': 'off' }
  },
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    languageOptions: {
      parser: parserJSON
    },
    rules: {
      // Standardizes order (no need to think or worry about the “best” order)
      'jsonc/no-bigint-literals': 'error',
      'jsonc/no-binary-expression': 'error',
      'jsonc/no-binary-numeric-literals': 'error',
      'jsonc/no-dupe-keys': 'error',
      'jsonc/no-escape-sequence-in-identifier': 'error',
      'jsonc/no-floating-decimal': 'error',
      'jsonc/no-hexadecimal-numeric-literals': 'error',
      'jsonc/no-infinity': 'error',
      'jsonc/no-multi-str': 'error',
      'jsonc/no-nan': 'error',
      'jsonc/no-number-props': 'error',
      'jsonc/no-numeric-separators': 'error',
      'jsonc/no-octal': 'error',
      'jsonc/no-octal-escape': 'error',
      'jsonc/no-octal-numeric-literals': 'error',
      'jsonc/no-parenthesized': 'error',
      'jsonc/no-plus-sign': 'error',
      'jsonc/no-regexp-literals': 'error',
      'jsonc/no-sparse-arrays': 'error',
      'jsonc/no-template-literals': 'error',
      'jsonc/no-undefined-value': 'error',
      'jsonc/no-unicode-codepoint-escapes': 'error',
      'jsonc/no-useless-escape': 'error',
      // and reduces merge conflicts. Feel free to`"eslint-disable`.
      'jsonc/sort-array-values': [
        'error',
        { order: { type: 'asc' }, pathPattern: '.*' }
      ],
      'jsonc/space-unary-ops': 'error',
      'jsonc/valid-json-number': 'error'
    }
  }
]
