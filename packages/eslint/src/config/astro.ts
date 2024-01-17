import { GLOB_ASTRO } from '../glob'
import { parserAstro, pluginAstro } from '../plugins'

export const astro: Config = [
  {
    files: [GLOB_ASTRO],
    languageOptions: {
      parser: parserAstro
    },
    plugins: {
      astro: pluginAstro as any
    },
    rules: {
      ...(pluginAstro.configs.recommended.rules as any)
    }
  }
]
