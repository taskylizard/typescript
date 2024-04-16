// @ts-expect-error missing types
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { tasky } from './src'

export default tasky(
  {
    vue: true,
    react: true,
    solid: true,
    astro: true,
    typescript: true,
    formatters: true
  },
  {
    ignores: ['fixtures', '_fixtures']
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error'
    }
  },
  {
    files: ['src/config/*.ts'],
    plugins: {
      'style-migrate': styleMigrate
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }]
    }
  }
)
