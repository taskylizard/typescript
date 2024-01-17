import { pluginImport } from '../plugins'

export const imports: Config = [
  {
    plugins: {
      import: pluginImport
    },
    rules: {
      'import/export': 'error',
      'import/first': 'error',
      'import/newline-after-import': [
        'error',
        { considerComments: true, count: 1 }
      ],
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/order': 'error'
    }
  }
]
