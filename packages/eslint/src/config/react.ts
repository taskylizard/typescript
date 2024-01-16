import type { FlatESLintConfigItem } from 'eslint-define-config'

import { pluginImport, pluginReact, pluginReactHooks } from '../plugins'

const disabledRules = {
  // Handled better by TypeScript
  'react/no-unknown-property': 'off',
  'react/prop-types': 'off',
  // Disables requiring react.
  'react/react-in-jsx-scope': 'off'
} as const

export const react: FlatESLintConfigItem[] = [
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      react: pluginReact,
      reacthooks: pluginReactHooks
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginImport.configs.react.rules,
      ...disabledRules,
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
      'react/self-closing-comp': 'warn'
    }
  }
]
