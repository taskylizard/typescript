import type { TypedFlatConfigItem } from '../types'
import { pluginPerfectionist } from '../plugins'

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'tasky/perfectionist/setup',
      plugins: {
        perfectionist: pluginPerfectionist
      }
    }
  ]
}
