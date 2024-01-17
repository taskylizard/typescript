import { pluginUnoCSS } from '../plugins'

export const unocss: Config = [
  {
    plugins: {
      unocss: pluginUnoCSS as any
    },
    rules: {
      'unocss/order': 'warn'
    }
  }
]
