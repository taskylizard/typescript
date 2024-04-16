import { interopDefault } from '../utils'
import type {
  OptionsOverrides,
  StylisticConfig,
  TypedFlatConfigItem
} from '../types'
import { pluginAntfu } from '../plugins'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false
}

export async function stylistic(
  options: StylisticConfig & OptionsOverrides = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi
  } = {
    ...StylisticConfigDefaults,
    ...options
  }

  const pluginStylistic = await interopDefault(
    import('@stylistic/eslint-plugin')
  )

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi
  })

  return [
    {
      name: 'tasky/stylistic/rules',
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic
      },
      rules: {
        ...config.rules,

        'antfu/consistent-list-newline': 'error',
        'antfu/if-newline': 'error',
        'antfu/top-level-function': 'error',

        curly: ['error', 'multi-or-nest', 'consistent'],
        /**
         * Require camel case names.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/camelcase
         */
        camelcase: [
          'error',
          {
            allow: ['^UNSAFE_'],
            ignoreDestructuring: false,
            properties: 'never'
          }
        ],
        /**
         * Require function expressions to have a name.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/func-names
         */
        'func-names': ['error', 'as-needed'],
        /**
         * Require a capital letter for constructors.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/new-cap
         */
        'new-cap': ['error', { capIsNew: false }],
        /**
         * Disallow use of the Array constructor.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-array-constructor
         */
        'no-array-constructor': 'error',
        /**
         * Disallow use of bitwise operators.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-bitwise
         */
        'no-bitwise': 'error',
        /**
         * Disallow if as the only statement in an else block.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-lonely-if
         */
        'no-lonely-if': 'warn',
        /**
         * Disallow use of chained assignment expressions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-multi-assign
         */
        'no-multi-assign': ['error'],
        /**
         * Disallow nested ternary expressions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-nested-ternary
         */
        'no-nested-ternary': 'error',
        /**
         * Disallow ternary operators when simpler alternatives exist.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-unneeded-ternary
         */
        'no-unneeded-ternary': 'error',
        /**
         * Require use of an object spread over Object.assign.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-object-spread
         */
        'prefer-object-spread': 'warn',

        ...overrides
      }
    }
  ]
}
