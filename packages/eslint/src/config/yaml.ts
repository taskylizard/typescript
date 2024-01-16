import type { FlatESLintConfigItem } from 'eslint-define-config'

import { GLOB_YAML } from '../glob'
import { parserYAML, pluginYAML } from '../plugins'

export const yaml: FlatESLintConfigItem[] = [
  {
    files: [GLOB_YAML],
    plugins: {
      yaml: pluginYAML as any
    },

    languageOptions: {
      parser: parserYAML
    },
    rules: {
      'style/spaced-comment': 'off',
      'yaml/block-mapping': 'error',
      'yaml/block-sequence': 'error',
      'yaml/no-empty-key': 'error',
      'yaml/no-empty-sequence-entry': 'error',
      'yaml/no-irregular-whitespace': 'error',
      'yaml/plain-scalar': 'error',
      'yaml/block-mapping-question-indicator-newline': 'error',
      'yaml/block-sequence-hyphen-indicator-newline': 'error',
      'yaml/flow-mapping-curly-newline': 'error',
      'yaml/flow-mapping-curly-spacing': 'error',
      'yaml/flow-sequence-bracket-newline': 'error',
      'yaml/flow-sequence-bracket-spacing': 'error',
      'yaml/indent': ['error', 2],
      'yaml/key-spacing': 'error',
      'yaml/no-tab-indent': 'error',
      'yaml/quotes': ['error', { avoidEscape: false, prefer: 'double' }],
      'yaml/spaced-comment': 'error'
    }
  }
]
