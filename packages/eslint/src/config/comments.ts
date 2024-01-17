import { pluginComments } from '../plugins'

export const comments: Config = [
  {
    plugins: {
      'eslint-comments': pluginComments
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }]
    }
  }
]
