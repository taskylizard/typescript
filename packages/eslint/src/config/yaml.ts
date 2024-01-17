import { GLOB_YAML } from '../glob'
import { parserYAML, pluginYAML } from '../plugins'

export const yaml: Config = [
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYAML
    },

    plugins: {
      yaml: pluginYAML as any
    },
    rules: {
      'style/spaced-comment': 'off',
      'yaml/block-mapping': 'error',
      'yaml/block-mapping-question-indicator-newline': 'error',
      'yaml/block-sequence': 'error',
      'yaml/block-sequence-hyphen-indicator-newline': 'error',
      'yaml/flow-mapping-curly-newline': 'error',
      'yaml/flow-mapping-curly-spacing': 'error',
      'yaml/flow-sequence-bracket-newline': 'error',
      'yaml/flow-sequence-bracket-spacing': 'error',
      'yaml/indent': ['error', 2],
      'yaml/key-spacing': 'error',
      'yaml/no-empty-key': 'error',
      'yaml/no-empty-sequence-entry': 'error',
      'yaml/no-irregular-whitespace': 'error',
      'yaml/no-tab-indent': 'error',
      'yaml/plain-scalar': 'error',
      'yaml/quotes': ['error', { avoidEscape: false, prefer: 'double' }],
      'yaml/spaced-comment': 'error'
    }
  }
]
