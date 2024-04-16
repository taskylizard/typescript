import process from 'node:process'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../glob'
import type {
  OptionsComponentExts,
  OptionsFiles,
  OptionsOverrides,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
  TypedFlatConfigItem
} from '../types'
import { pluginAntfu } from '../plugins'
import { interopDefault, renameRules, toArray } from '../utils'

export async function typescript(
  options: OptionsFiles &
    OptionsComponentExts &
    OptionsOverrides &
    OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions = {}
): Promise<TypedFlatConfigItem[]> {
  const { componentExts = [], overrides = {}, parserOptions = {} } = options

  const files = options.files ?? [
    GLOB_SRC,
    ...componentExts.map((ext) => `**/*.${ext}`)
  ]

  const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]
  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined
  const isTypeAware = !!tsconfigPath

  const typeAwareRules: TypedFlatConfigItem['rules'] = {
    'dot-notation': 'off',
    'no-implied-eval': 'off',
    'no-throw-literal': 'off',
    'no-loss-of-precision': 'off',
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'ts/await-thenable': 'error',
    'ts/dot-notation': ['error', { allowKeywords: true }],
    'ts/no-floating-promises': 'error',
    'ts/no-for-in-array': 'error',
    'ts/no-implied-eval': 'error',
    'ts/no-misused-promises': 'error',
    'ts/only-throw-error': 'error',
    'ts/no-unnecessary-type-assertion': 'error',
    'ts/no-unsafe-argument': 'error',
    'ts/no-unsafe-assignment': 'error',
    'ts/no-unsafe-call': 'error',
    'ts/no-unsafe-member-access': 'error',
    'ts/no-unsafe-return': 'error',
    'ts/restrict-plus-operands': 'error',
    'ts/restrict-template-expressions': 'error',
    'ts/unbound-method': 'error'
  }

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser'))
  ] as const)

  function makeParser(
    typeAware: boolean,
    files: string[],
    ignores?: string[]
  ): TypedFlatConfigItem {
    return {
      files,
      ...(ignores ? { ignores } : {}),
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map((ext) => `.${ext}`),
          sourceType: 'module',
          ...(typeAware
            ? {
              project: tsconfigPath,
              tsconfigRootDir: process.cwd()
            }
            : {}),
          ...(parserOptions as any)
        }
      },
      name: `tasky/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`
    }
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'tasky/typescript/setup',
      plugins: {
        antfu: pluginAntfu,
        ts: pluginTs as any
      }
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...(isTypeAware
      ? [
        makeParser(true, filesTypeAware),
        makeParser(false, files, filesTypeAware)
      ]
      : [makeParser(false, files)]),
    {
      files,
      name: 'tasky/typescript/rules',
      rules: {
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' }
        ),
        ...renameRules(pluginTs.configs.strict.rules!, {
          '@typescript-eslint': 'ts'
        }),
        'no-dupe-class-members': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': [
          'error',
          { 'ts-ignore': 'allow-with-description' }
        ],
        'ts/ban-types': ['error', { types: { Function: false } }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        /**
         * Require consistent usage of type imports.
         *
         * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
         */
        'ts/consistent-type-imports': [
          'error',
          { disallowTypeAnnotations: false, prefer: 'type-imports' }
        ],
        /**
         * Require using function property types in method signatures.
         *
         * These have enhanced typechecking, whereas method signatures do not.
         * @see - https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
         * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
         */
        'ts/method-signature-style': ['error', 'property'],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-loss-of-precision': 'error',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': 'error',
        'ts/no-require-imports': 'error',
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
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',
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
         * Require default parameters to be last.
         *
         * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
         */
        'ts/default-param-last': 'error',
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
        /**
         * Disallow creation of functions within loops.
         *
         * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
         */
        'ts/no-loop-func': 'error',
        /**
         * Disallow members of unions and intersections that do nothing or override type information.
         *
         * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
         */
        'ts/no-redundant-type-constituents': 'warn',
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
        'ts/require-array-sort-compare': [
          'error',
          { ignoreStringArrays: true }
        ],
        /**
         * Require exhaustive checks when using union types in switch statements.
         *
         * This ensures cases are considered when items are later added to a union.
         *
         * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
         */
        'ts/switch-exhaustiveness-check': 'error',
        ...overrides
      }
    },
    ...(isTypeAware
      ? [
        {
          files: filesTypeAware,
          name: 'tasky/typescript/rules-type-aware',
          rules: {
            ...(tsconfigPath ? typeAwareRules : {}),
            ...overrides
          }
        }
      ]
      : []),
    {
      files: ['**/*.d.ts'],
      name: 'tasky/typescript/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'tasky/typescript/disables/test',
      rules: {
        'no-unused-expressions': 'off'
      }
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'tasky/typescript/disables/cjs',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off'
      }
    }
  ]
}
