import type { FlatESLintConfigItem } from 'eslint-define-config'

import { GLOB_HTML } from '../glob'
import { parserHTML, pluginHTML } from '../plugins'

export const html: FlatESLintConfigItem[] = [
  {
    files: [GLOB_HTML],
    plugins: {
      html: pluginHTML
    },
    languageOptions: {
      parser: parserHTML
    },
    rules: {
      ...pluginHTML.configs.recommended.rules,
      'html/id-naming-convention': ['error', 'kebab-case'],
      'html/indent': 'off',
      'html/no-abstract-roles': 'error',
      'html/no-accesskey-attrs': 'error',
      'html/no-aria-hidden-body': 'error',
      'html/no-extra-spacing-attrs': 'off',
      'html/no-inline-styles': 'error',
      'html/no-non-scalable-viewport': 'error',
      'html/no-positive-tabindex': 'error',
      'html/no-skip-heading-levels': 'error',
      'html/no-target-blank': 'error',
      'html/require-button-type': 'error',
      'html/require-closing-tags': 'off',
      'html/require-frame-title': 'error',
      'html/require-meta-charset': 'error',
      'html/require-meta-description': 'error',
      'html/require-meta-viewport': 'error'
    }
  }
]
