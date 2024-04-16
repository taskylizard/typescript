import { isPackageExists } from 'local-pkg'
import { ensurePackages, interopDefault } from '../utils'
import type {
  OptionsFiles,
  OptionsHasTypeScript,
  OptionsOverrides,
  TypedFlatConfigItem
} from '../types'
import { GLOB_JSX, GLOB_TSX } from '../glob'

// react refresh
const ReactRefreshAllowConstantExportPackages = ['vite']

export async function react(
  options: OptionsHasTypeScript & OptionsOverrides & OptionsFiles = {}
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_JSX, GLOB_TSX],
    overrides = {},
    typescript = true
  } = options

  await ensurePackages([
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
    'eslint-plugin-jsx-a11y'
  ])

  const [pluginReact, pluginReactHooks, pluginReactRefresh, pluginJsxA11y] =
    await Promise.all([
      interopDefault(import('eslint-plugin-react')),
      interopDefault(import('eslint-plugin-react-hooks')),
      interopDefault(import('eslint-plugin-react-refresh')),
      interopDefault(import('eslint-plugin-jsx-a11y'))
    ] as const)

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(
    (i) => isPackageExists(i)
  )

  return [
    {
      name: 'tasky/react/setup',
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        'jsx-a11y': pluginJsxA11y
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      name: 'tasky/react/rules',
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: isAllowConstantExport }
        ],

        // recommended rules react
        'react/display-name': 'error',
        'react/jsx-key': 'error',
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-render-return-value': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'off',
        'react/prop-types': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/require-render-return': 'error',
        /**
         * Require an explicit type when using button elements.
         *
         * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
         */
        'react/button-has-type': 'warn',
        /**
         * Require consistent function type for function components.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
         */
        'react/function-component-definition': 'warn',
        /**
         * Require destructuring and symmetric naming of `useState` hook value and setter variables.
         *
         * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
         */
        'react/hook-use-state': 'warn',
        /**
         * Require consistent boolean attributes notation in JSX.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
         */
        'react/jsx-boolean-value': 'warn',
        /**
         * Disallow unnecessary curly braces in JSX props and children.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
         */
        'react/jsx-curly-brace-presence': 'warn',
        /**
         * Require using shorthand form for React fragments, unless required.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
         */
        'react/jsx-fragments': 'warn',
        /**
         * Prevent problematic leaked values from being rendered.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
         */
        'react/jsx-no-leaked-render': 'warn',
        /**
         * Prevents usage of unsafe `target='_blank'`.
         *
         * This rule is a part of `react/recommended`, but we've modified it to
         * allow referrer.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
         */
        'react/jsx-no-target-blank': [
          'error',
          {
            allowReferrer: true
          }
        ],
        /**
         * Disallow empty React fragments.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
         */
        'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
        /**
         * Require the use of PascalCase for user-defined JSX components.
         *
         * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
         */
        'react/jsx-pascal-case': 'warn',
        /**
         * Require props to be sorted alphabetically.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
         */
        'react/jsx-sort-props': 'warn',
        /**
         * Disallow usage of Array index in keys.
         *
         * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
         */
        'react/no-array-index-key': 'warn',
        /**
         * Disallow creating unstable components inside components.
         *
         * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
         */
        'react/no-unstable-nested-components': 'error',
        /**
         * Disallow closing tags for components without children.
         *
         * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
         */
        'react/self-closing-comp': 'warn',
        ...(typescript
          ? {
            'react/jsx-no-undef': 'off',
            'react/prop-type': 'off'
          }
          : {}),

        // overrides
        ...overrides
      }
    }
  ]
}
