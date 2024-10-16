import type { TypedFlatConfigItem } from '../types'
import { GLOB_EXCLUDE } from '../glob'

export async function ignores(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ignores: GLOB_EXCLUDE
      // Awaits https://github.com/humanwhocodes/config-array/pull/131
      // name: 'antfu/ignores',
    }
  ]
}
