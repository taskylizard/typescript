import { loadConfig } from 'c12'
import type { BuildConfig, BuildPreset } from './build/types'

interface Config {
  build?: { config: BuildConfig | BuildConfig[]; presets?: BuildPreset[] }
  tasks?: {}
}
export async function loadTaskerConfig(): Promise<any> {
  const { config } = await loadConfig<Config>({
    name: 'tasky'
  })

  let builds: BuildConfig[]
  let presets: BuildPreset[]

  if (config.build.config) {
    builds = (
      Array.isArray(config.build.config)
        ? config.build.config
        : [config.build.config]
    ).filter(Boolean)
  }

  if (config.build.presets) {
    presets = config.build.presets
  }

  return { builds, presets }
}

export function defineConfig(config: Config): Config {
  return {
    build: config.build,
    tasks: config.tasks
  } satisfies Config
}
