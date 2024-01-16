import { defineCommand } from 'citty'
import { resolve } from 'pathe'
import { build, logger } from '../core/build'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Build a project.'
  },
  args: {
    dir: {
      type: 'positional',
      description: 'The directory to build',
      required: false
    },
    stub: {
      type: 'boolean',
      description: 'Stub build'
    },
    minify: {
      type: 'boolean',
      description: 'Minify build'
    },
    sourcemap: {
      type: 'boolean',
      description: 'Generate sourcemaps (experimental)'
    }
  },
  async run({ args }) {
    const rootDir = resolve(process.cwd(), args.dir || '.')
    await build(rootDir, args.stub, {
      sourcemap: args.sourcemap,
      rollup: {
        esbuild: {
          minify: args.minify
        }
      }
    }).catch((error) => {
      logger.error(`Error building ${rootDir}: ${error}`)
      throw error
    })
  }
})
