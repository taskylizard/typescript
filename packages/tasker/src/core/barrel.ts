import { readdir, stat, writeFile } from 'node:fs/promises'
import { join, relative } from 'pathe'

const re = /\.m?[jt]sx?$/

/**
 * Generates an rollup exports file (also called a "barrel") for a directory by recursively scanning all available files.
 *
 * @param directory - The path to the directory to generate the index.ts file for.
 */
export async function barrel(directory: string): Promise<void> {
  const index = join(directory, 'index.ts')
  const contents: string[] = []

  async function scan(dir: string): Promise<void> {
    const files = await readdir(dir)
    await Promise.all(
      files.map(async (file: string) => {
        const filePath = join(dir, file)
        const stats = await stat(filePath)

        if (stats.isDirectory()) {
          await scan(filePath) // Continue scanning recursively
        } else if (
          stats.isFile() &&
          re.test(file) &&
          !file.startsWith('index')
        ) {
          // Append export statement for each .ts/.tsx file found
          const rel = relative(directory, filePath)
          const exports = `export * from './${rel.replace(re, '')}';`
          contents.push(exports)
        }
      })
    )
  }

  // Start scanning the directory
  await scan(directory)

  // Insert the banner at the top of the file
  const banner = '/**\n * Barrel generated using @taskylizard/tasker.\n */\n'
  contents.unshift(banner)

  // Write the collected export statements to the index.ts file
  await writeFile(index, contents.join('\n'), 'utf-8')
}
