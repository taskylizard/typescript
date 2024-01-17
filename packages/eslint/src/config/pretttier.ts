import { configPrettier, pluginPrettier } from '../plugins'

export const prettier: Config = [
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'warn'
    },
    settings: {}
  }
]
