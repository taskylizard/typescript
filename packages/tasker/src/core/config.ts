import { loadConfig } from 'c12'
import type { BuildConfig } from './build/types'

interface Config {
  build?: BuildConfig | BuildConfig[]
  tasks?: {}
}
export async function loadTaskerConfig(): Promise<any> {
  const { config } = await loadConfig<Config>({
    name: 'tasky'
  })

  let builds: BuildConfig[]

  if (config.build) {
    builds = (
      Array.isArray(config.build) ? config.build : [config.build]
    ).filter(Boolean)
  }

  return { builds }
}

export function defineConfig(config: Config): Config {
  return {
    build: config.build,
    tasks: config.tasks
  } satisfies Config
}
