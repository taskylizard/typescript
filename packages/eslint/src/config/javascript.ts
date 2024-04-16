import globals from 'globals'
import type {
  OptionsIsInEditor,
  OptionsOverrides,
  TypedFlatConfigItem
} from '../types'
import { pluginAntfu, pluginUnusedImports } from '../plugins'
import { GLOB_SRC, GLOB_SRC_EXT } from '../glob'

export async function javascript(
  options: OptionsIsInEditor & OptionsOverrides = {}
): Promise<TypedFlatConfigItem[]> {
  const { isInEditor = false, overrides = {} } = options

  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly'
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          ecmaVersion: 2022,
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      linterOptions: {
        reportUnusedDisableDirectives: true
      },
      name: 'tasky/javascript/rules',
      plugins: {
        antfu: pluginAntfu,
        'unused-imports': pluginUnusedImports
      },
      rules: {
        'accessor-pairs': [
          'error',
          { enforceForClassMembers: true, setWithoutGet: true }
        ],

        'constructor-super': 'error',
        'dot-notation': ['error', { allowKeywords: true }],
        'new-cap': [
          'error',
          { capIsNew: false, newIsCap: true, properties: true }
        ],
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-const-assign': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-obj-calls': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': ['error', { builtinGlobals: false }],
        'no-regex-spaces': 'error',
        'no-restricted-globals': [
          'error',
          { message: 'Use `Uint8Array` instead.', name: 'Buffer' },
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' }
        ],
        'no-restricted-properties': [
          'error',
          {
            message:
              'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineGetter__'
          },
          {
            message: 'Use `Object.defineProperty` instead.',
            property: '__defineSetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupGetter__'
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupSetter__'
          }
        ],
        'no-restricted-imports': [
          'error',
          { name: 'buffer', message: 'Use Uint8Array instead.' },
          { name: 'node:buffer', message: 'Use Uint8Array instead.' }
        ],
        'no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment'
        ],
        'no-self-assign': ['error', { props: true }],
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true
          }
        ],
        'no-use-before-define': [
          'error',
          { classes: false, functions: false, variables: true }
        ],
        'no-useless-backreference': 'error',
        'no-useless-catch': 'error',
        'no-useless-constructor': 'error',
        'no-with': 'error',
        'one-var': ['error', { initialized: 'never' }],
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true
          }
        ],
        'prefer-exponentiation-operator': 'error',
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false,
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
          }
        ],

        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_'
          }
        ],
        'use-isnan': [
          'error',
          { enforceForIndexOf: true, enforceForSwitchCase: true }
        ],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        /**
         * Require return statements in array methods callbacks.
         *
         * 🚫 Not fixable -https://eslint.org/docs/rules/array-callback-return
         */
        'array-callback-return': ['error', { allowImplicit: true }],
        /**
         * Treat `var` statements as if they were block scoped.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/block-scoped-var
         */
        'block-scoped-var': 'error',
        /**
         * Require curly braces for multiline blocks.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/curly
         */
        curly: ['warn', 'multi-line'],
        /**
         * Require default clauses in switch statements to be last (if used).
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/default-case-last
         */
        'default-case-last': 'error',
        /**
         * Require triple equals (`===` and `!==`).
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/eqeqeq
         */
        eqeqeq: ['error', 'smart'],
        /**
         * Require grouped accessor pairs in object literals and classes.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/grouped-accessor-pairs
         */
        'grouped-accessor-pairs': 'error',
        /**
         * Disallow use of `alert()`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-alert
         */
        'no-alert': 'error',
        /**
         * Disallow use of `caller`/`callee`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-caller
         */
        'no-caller': 'error',
        /**
         * Disallow expressions where the operation doesn't affect the value.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-console
         */
        'no-constant-binary-expression': 'error',
        /**
         * Disallow returning value in constructor.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-constructor-return
         */
        'no-constructor-return': 'error',
        /**
         * Disallow using an `else` if the `if` block contains a return.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-else-return
         */
        'no-else-return': 'warn',
        /**
         * Disallow `eval()`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-eval
         */
        'no-eval': 'error',
        /**
         * Disallow extending native objects.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-extend-native
         */
        'no-extend-native': 'error',
        /**
         * Disallow unnecessary function binding.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-bind
         */
        'no-extra-bind': 'error',
        /**
         * Disallow unnecessary labels.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-label
         */
        'no-extra-label': 'error',
        /**
         * Disallow floating decimals.
         *
         * 🔧 Fixable - https://eslint.style/rules/js/no-floating-decimal
         */
        'style/no-floating-decimal': 'error',
        /**
         * Make people convert types explicitly e.g. `Boolean(foo)` instead of `!!foo`.
         *
         * 🔧 Partially Fixable - https://eslint.org/docs/rules/no-implicit-coercion
         */
        'no-implicit-coercion': 'error',
        /**
         * Disallow use of `eval()`-like methods.
         *
         * https://eslint.org/docs/rules/no-implied-eval
         */
        'no-implied-eval': 'error',
        /**
         * Disallow usage of `__iterator__` property.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-iterator
         */
        'no-iterator': 'error',
        /**
         * Disallow labels that share a name with a variable.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-label-var
         */
        'no-label-var': 'error',
        /**
         * Disallow use of labels for anything other than loops and switches.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-labels
         */
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
        /**
         * Disallow unnecessary nested blocks.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-lone-blocks
         */
        'no-lone-blocks': 'error',
        /**
         * Disallow `new` for side effects.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-new
         */
        'no-new': 'error',
        /**
         * Disallow function constructors.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-func
         */
        'no-new-func': 'error',
        /**
         * Disallow primitive wrapper instances, such as `new String('foo')`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-wrappers
         */
        'no-new-wrappers': 'error',
        /**
         * Disallow use of octal escape sequences in string literals.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-octal-escape
         */
        'no-octal-escape': 'error',
        /**
         * Disallow reassignment of function parameters.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-param-reassign
         */
        'no-param-reassign': 'error',
        /**
         * Disallow returning values from Promise executor functions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-promise-executor-return
         */
        'no-promise-executor-return': 'error',
        /**
         * Disallow usage of the deprecated `__proto__` property.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-proto
         */
        'no-proto': 'error',
        /**
         * Disallow assignment in `return` statement.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-return-assign
         */
        'no-return-assign': 'error',
        /**
         * Disallow use of `javascript:` urls.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-script-url
         */
        'no-script-url': 'error',
        /**
         * Disallow comparisons where both sides are exactly the same.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-self-compare
         */
        'no-self-compare': 'error',
        /**
         * Disallow use of comma operator.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-sequences
         */
        'no-sequences': 'error',
        /**
         * Disallow template literal placeholder syntax in regular strings, as
         * these are likely errors.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-template-curly-in-string
         */
        'no-template-curly-in-string': 'error',
        /**
         * Disallow initializing variables to `undefined`.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-undef-init
         */
        'no-undef-init': 'warn',
        /**
         *  Disallow loops with a body that allows only one iteration.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-unreachable-loop
         */
        'no-unreachable-loop': 'error',
        /**
         * Disallow unused variables.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-unused-vars
         */
        'no-unused-vars': [
          'error',
          {
            caughtErrors: 'none',
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: false,
            vars: 'all',
            varsIgnorePattern: '^_'
          }
        ],
        /**
         * Disallow unnecessary `.call()` and `.apply()`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-call
         */
        'no-useless-call': 'error',
        /**
         * Disallow useless computed property keys.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-computed-key
         */
        'no-useless-computed-key': 'warn',
        /**
         * Disallow unnecessary concatenation of strings.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-concat
         */
        'no-useless-concat': 'error',
        /**
         * Disallow renaming import, export, and destructured assignments to the
         * same name.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-rename
         */
        'no-useless-rename': 'warn',
        /**
         * Disallow redundant return statements.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-return
         */
        'no-useless-return': 'warn',
        /**
         * Require `let` or `const` instead of `var`.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-var
         */
        'no-var': 'error',
        /**
         * Require object literal shorthand syntax.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/object-shorthand
         */
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false
          }
        ],
        /**
         * Require default to `const` instead of `let`.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-const
         */
        'prefer-const': [
          'warn',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true
          }
        ],
        /**
         * Require using named capture groups in regular expressions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-named-capture-group
         */
        'prefer-named-capture-group': 'error',
        /**
         * Disallow parseInt() in favor of binary, octal, and hexadecimal literals.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-numeric-literals
         */
        'prefer-numeric-literals': 'error',
        /**
         * Require using Error objects as Promise rejection reasons.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-promise-reject-errors
         */
        'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
        /**
         * Disallow use of the RegExp constructor in favor of regular expression
         * literals.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-regex-literals
         */
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        /**
         * Require using rest parameters instead of `arguments`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-rest-params
         */
        'prefer-rest-params': 'error',
        /**
         * Require using spread syntax instead of `.apply()`.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-spread
         */
        'prefer-spread': 'error',
        /**
         * Require using template literals instead of string concatenation.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-template
         */
        'prefer-template': 'warn',
        /**
         * Require a `Symbol` description.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/symbol-description
         */
        'symbol-description': 'error',
        /**
         * Disallow "Yoda conditions", ensuring the comparison.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/yoda
         */
        yoda: 'warn',
        ...overrides
      }
    },
    {
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      name: 'tasky/javascript/disables/cli',
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
