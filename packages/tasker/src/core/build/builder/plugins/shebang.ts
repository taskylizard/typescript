import { promises as fsp } from 'node:fs'
import { resolve } from 'pathe'
import type { Plugin } from 'rollup'

// Forked from https://github.com/developit/rollup-plugin-preserve-shebang (1.0.1 @ MIT)

const SHEBANG_RE = /^#![^\n]*/

export function shebangPlugin(): Plugin {
  return {
    name: 'tasker:build:shebang',
    async writeBundle(options, bundle) {
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== 'chunk') {
          continue
        }
        if (SHEBANG_RE.test(output.code)) {
          const outFile = resolve(options.dir!, fileName)
          await makeExecutable(outFile)
        }
      }
    }
  }
}

export function removeShebangPlugin(): Plugin {
  return {
    name: 'tasker:build:remove-shebang',
    renderChunk(code) {
      return code.replace(SHEBANG_RE, '')
    }
  }
}

export async function makeExecutable(filePath: string) {
  await fsp.chmod(filePath, 0o755 /* rwx r-x r-x */).catch(() => {})
}

export function getShebang(code: string, append = '\n') {
  const m = SHEBANG_RE.exec(code)
  return m ? m + append : ''
}
