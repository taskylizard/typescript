import { pluginNode } from '../plugins'

export const node: Config = [
  {
    plugins: {
      n: pluginNode
    },
    rules: {
      'n/handle-callback-err': ['error', '^(err|error)$'],
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/prefer-global/buffer': ['error', 'never'],
      'n/prefer-global/process': ['error', 'always'],
      'n/process-exit-as-throw': 'error'
    }
  }
]
