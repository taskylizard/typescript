import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../glob'
import { pluginMarkdown, pluginTS } from '../plugins'

export const markdown: Config = [
  {
    files: [GLOB_MARKDOWN],
    plugins: {
      markdown: pluginMarkdown
    },
    processor: 'markdown/markdown'
  },
  {
    files: [GLOB_MARKDOWN_CODE],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    },
    plugins: {
      ts: pluginTS as any
    },
    rules: {
      ...pluginMarkdown.configs.recommended.overrides[1].rules,
      'import/no-unresolved': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'node/prefer-global/process': 'off',
      'ts/comma-dangle': 'off',
      'ts/consistent-type-imports': 'off',
      'ts/no-namespace': 'off',
      'ts/no-redeclare': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-use-before-define': 'off',
      'ts/no-var-requires': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  }
]
