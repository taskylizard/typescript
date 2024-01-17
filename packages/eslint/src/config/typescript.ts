import { resolve } from 'node:path'
import { GLOB_TS, GLOB_TSX } from '../glob'
import { parserTS, pluginTS } from '../plugins'

const project = resolve(process.cwd(), 'tsconfig.json')

// Disabled rules for TypeScript.
const disabledRules = {
  'import/default': 'off',
  'import/export': 'off',
  'import/namespace': 'off',
  'import/no-unresolved': 'off',
  'no-loss-of-precision': 'off',
  'no-redeclare': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off'
} as const

export const typescript: Config = [
  {
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: parserTS,
      parserOptions: {
        project,
        sourceType: 'module'
      }
    },
    plugins: {
      ts: pluginTS as any
    },
    rules: {
      ...disabledRules,
      'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      /**
       * Require consistent usage of type exports.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
       */
      'ts/consistent-type-exports': [
        'warn',
        { fixMixedExportsWithInlineTypeSpecifier: true }
      ],
      /**
       * Require consistent usage of type imports.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
       */
      'ts/consistent-type-imports': 'warn',
      /**
       * Require default parameters to be last.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
       */
      'ts/default-param-last': 'error',
      /**
       * Require using function property types in method signatures.
       *
       * These have enhanced typechecking, whereas method signatures do not.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
       */
      'ts/method-signature-style': 'warn',
      /**
       * Require consistent naming conventions.
       *
       * Improves IntelliSense suggestions and avoids name collisions.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
       */
      'ts/naming-convention': [
        'error',
        // Anything type-like should be written in PascalCase.
        {
          format: ['PascalCase'],
          selector: ['typeLike', 'enumMember']
        },
        // Interfaces cannot be prefixed with `I`, or have restricted names.
        {
          custom: {
            match: false,
            regex: '^I[A-Z]|^(Interface|Props|State)$'
          },
          format: ['PascalCase'],
          selector: 'interface'
        }
      ],
      'ts/no-dupe-class-members': 'error',
      'ts/no-dynamic-delete': 'off',
      'ts/no-explicit-any': 'off',
      'ts/no-extraneous-class': 'off',
      'ts/no-import-type-side-effects': 'error',
      'ts/no-invalid-void-type': 'off',
      /**
       * Disallow creation of functions within loops.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
       */
      'ts/no-loop-func': 'error',
      'ts/no-loss-of-precision': 'error',
      'ts/no-non-null-assertion': 'off',
      'ts/no-redeclare': 'error',
      /**
       * Disallow members of unions and intersections that do nothing or override type information.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
       */
      'ts/no-redundant-type-constituents': 'warn',
      'ts/no-require-imports': 'error',
      /**
       * Disallow variable declarations from shadowing variables declared in the
       * outer scope.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-shadow/
       */
      'ts/no-shadow': 'error',
      /**
       * Disallow unnecessary namespace qualifiers.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
       */
      'ts/no-unnecessary-qualifier': 'warn',
      /**
       * Disallow unused variables.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars/
       */
      'ts/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_'
        }
      ],
      'ts/no-use-before-define': [
        'error',
        { classes: false, functions: false, variables: true }
      ],
      /**
       * Disallow unnecessary constructors.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-useless-constructor/
       */
      'ts/no-useless-constructor': 'error',
      /**
       * Require using `RegExp.exec()` over `String.match()` for consistency.
       *
       * 🔧 Fixable - https://typescript-eslint.io/rules/prefer-regexp-exec/
       */
      'ts/prefer-regexp-exec': 'warn',
      'ts/prefer-ts-expect-error': 'error',
      /**
       * Require Array#sort calls to provide a compare function.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
       */
      'ts/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
      /**
       * Require exhaustive checks when using union types in switch statements.
       *
       * This ensures cases are considered when items are later added to a union.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
       */
      'ts/switch-exhaustiveness-check': 'error'
    },
    settings: {
      'import/resolver': {
        typescript: {
          project
        }
      }
    }
  }
]
