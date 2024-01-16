import type { FlatESLintConfigItem } from 'eslint-define-config'
import globals from 'globals'

import { pluginJest } from '../plugins'

export const jest: FlatESLintConfigItem[] = [
  {
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    plugins: {
      jest: pluginJest
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      /**
       * Disallow duplicate setup and teardown hooks.
       *
       * 🚫 Not fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
       */
      'jest/no-duplicate-hooks': 'error',
      /**
       * Require lowercase test names.
       *
       * 🔧 Fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
       */
      'jest/prefer-lowercase-title': 'warn',
      /**
       * Require test cases and hooks to be inside a `describe` block.
       *
       * 🚫 Not fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
       */
      'jest/require-top-level-describe': 'error',
      // TODO: document the rest
      'jest/no-conditional-expect': 'error',
      'jest/no-conditional-in-test': 'error',
      'jest/no-alias-methods': 'error',
      'jest/no-export': 'error',
      'jest/no-done-callback': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/valid-describe-callback': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/prefer-comparison-matcher': 'error',
      'jest/prefer-equality-matcher': 'error',
      'jest/prefer-expect-resolves': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/valid-title': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-expect': 'error',
      'jest/consistent-test-it': [
        'error',
        { fn: 'test', withinDescribe: 'test' }
      ]
    }
  }
]
