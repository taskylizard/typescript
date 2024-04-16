import type { TypedFlatConfigItem } from '../types'
import { pluginUnicorn } from '../plugins'

export async function unicorn(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'tasky/unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn
      },
      rules: {
        'unicorn/better-regex': 'error',
        'unicorn/catch-error-name': 'error',
        'unicorn/custom-error-definition': 'error',
        // Pass error message when throwing errors
        'unicorn/error-message': 'error',
        // Uppercase regex escapes
        'unicorn/escape-case': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-array-callback-reference': 'error',
        'unicorn/no-array-method-this-argument': 'error',
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-hex-escape': 'error',
        // Array.isArray instead of instanceof
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-invalid-remove-event-listener': 'error',
        'unicorn/no-lonely-if': 'error',
        // Ban `new Array` as `Array` constructor's params are ambiguous
        'unicorn/no-new-array': 'error',
        // Prevent deprecated `new Buffer()`
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/no-unnecessary-await': 'error',
        'unicorn/no-zero-fractions': `error`,
        // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-array-find': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-at': 'error',
        'unicorn/prefer-blob-reading-methods': 'error',
        'unicorn/prefer-date-now': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-dataset': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        // textContent instead of innerText
        'unicorn/prefer-dom-node-text-content': 'error',
        // includes over indexOf when checking for existence
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-modern-dom-apis': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/prefer-negative-index': 'error',
        // Prefer using the node: protocol
        'unicorn/prefer-node-protocol': 'error',
        // Prefer using number properties like `Number.isNaN` rather than `isNaN`
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/prefer-prototype-methods': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-reflect-apply': 'error',
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-string-slice': 'error',
        // String methods startsWith/endsWith instead of more complicated stuff
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-trim-start-end': 'error',
        'unicorn/prefer-top-level-await': 'error',
        // Enforce throwing type error when throwing error while checking typeof
        'unicorn/prefer-type-error': 'error',
        // Use new when throwing error
        'unicorn/throw-new-error': 'error'
      }
    }
  ]
}
