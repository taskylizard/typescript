// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import tasky from './dist/index.js'

export default tasky(
  {
    files: ['src/config/*.ts'],
    plugins: {
      'style-migrate': styleMigrate
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }]
    }
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error'
    }
  }
)
