import globals from 'globals'

import { pluginJest } from '../plugins'
import { GLOB_TESTS } from 'src/glob'

export const jest: Config = [
  {
    files: GLOB_TESTS,
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
      'jest/consistent-test-it': [
        'error',
        { fn: 'test', withinDescribe: 'test' }
      ],
      'jest/no-alias-methods': 'error',
      // TODO: document the rest
      'jest/no-conditional-expect': 'error',
      'jest/no-conditional-in-test': 'error',
      'jest/no-done-callback': 'error',
      /**
       * Disallow duplicate setup and teardown hooks.
       *
       * 🚫 Not fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
       */
      'jest/no-duplicate-hooks': 'error',
      'jest/no-export': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/no-test-return-statement': 'error',
      'jest/prefer-comparison-matcher': 'error',
      'jest/prefer-equality-matcher': 'error',
      'jest/prefer-expect-resolves': 'error',
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-hooks-on-top': 'error',
      /**
       * Require lowercase test names.
       *
       * 🔧 Fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
       */
      'jest/prefer-lowercase-title': 'warn',
      'jest/prefer-strict-equal': 'error',
      /**
       * Require test cases and hooks to be inside a `describe` block.
       *
       * 🚫 Not fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-top-level-describe.md
       */
      'jest/require-top-level-describe': 'error',
      'jest/valid-describe-callback': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-title': 'error'
    }
  }
]
