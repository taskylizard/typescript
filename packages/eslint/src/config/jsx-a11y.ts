import { pluginJSXA11y } from '../plugins'
import { GLOB_JSX, GLOB_TSX } from 'src/glob'

export const JSX11y: Config = [
  {
    files: [GLOB_JSX, GLOB_TSX],
    plugins: {
      a11y: pluginJSXA11y
    },
    rules: {
      ...pluginJSXA11y.configs.recommended.rules,
      // This rule has been deprecated, but not yet removed.
      'a11y/no-onchange': 'off'
    }
  }
]
