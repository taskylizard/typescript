import type { PackageJson } from 'pkg-types'
import type { Hookable } from 'hookable'
import type { RollupOptions, RollupBuild, OutputOptions } from 'rollup'
import type { MkdistOptions } from 'mkdist'
import type { Schema } from 'untyped'
import type { RollupReplaceOptions } from '@rollup/plugin-replace'
import type { RollupAliasOptions } from '@rollup/plugin-alias'
import type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
import type { RollupJsonOptions } from '@rollup/plugin-json'
import type { Options as RollupDtsOptions } from 'rollup-plugin-dts'
import type commonjs from '@rollup/plugin-commonjs'
import type { JITIOptions } from 'jiti'
import type { EsbuildOptions } from './builder/plugins/esbuild'

type RollupCommonJSOptions = Parameters<typeof commonjs>[0] & {}

interface BaseBuildEntry {
  builder?: 'untyped' | 'rollup' | 'mkdist'
  input: string
  name?: string
  outDir?: string
  declaration?: 'compatible' | 'node16' | boolean
}

export interface UntypedBuildEntry extends BaseBuildEntry {
  builder: 'untyped'
  defaults?: Record<string, any>
}

interface RollupBuildEntry extends BaseBuildEntry {
  builder: 'rollup'
}

// eslint-disable-next-line ts/naming-convention
type _BaseAndMkdist = BaseBuildEntry & MkdistOptions
export interface MkdistBuildEntry extends _BaseAndMkdist {
  builder: 'mkdist'
}

export type BuildEntry =
  | BaseBuildEntry
  | RollupBuildEntry
  | UntypedBuildEntry
  | MkdistBuildEntry

interface RollupBuildOptions {
  emitCJS?: boolean
  cjsBridge?: boolean
  preserveDynamicImports?: boolean
  inlineDependencies?: boolean
  output?: OutputOptions
  // Plugins
  replace: RollupReplaceOptions | false
  alias: RollupAliasOptions | false
  resolve: RollupNodeResolveOptions | false
  json: RollupJsonOptions | false
  esbuild: EsbuildOptions | false
  commonjs: RollupCommonJSOptions | false
  dts: RollupDtsOptions
}

interface Copy {
  from: string
  to: string
}

export interface BuildOptions {
  name: string
  rootDir: string
  entries: BuildEntry[]
  clean: boolean
  /** @experimental */
  sourcemap: boolean
  /**
   * `compatible` means "src/index.ts" will generate "dist/index.d.mts", "dist/index.d.cts" and "dist/index.d.ts".
   * `node16` means "src/index.ts" will generate "dist/index.d.mts" and "dist/index.d.cts".
   * `true` is equivalent to `compatible`.
   * `false` will disable declaration generation.
   * `undefined` will auto detect based on "package.json". If "package.json" has "types" field, it will be `"compatible"`, otherwise `false`.
   */
  declaration?: 'compatible' | 'node16' | boolean
  outDir: string
  copy?: Copy[]
  stub: boolean
  stubOptions: { jiti: Omit<JITIOptions, 'transform' | 'onError'> }
  externals: (string | RegExp)[]
  dependencies: string[]
  peerDependencies: string[]
  devDependencies: string[]
  alias: { [find: string]: string }
  replace: { [find: string]: string }
  failOnWarn?: boolean
  rollup: RollupBuildOptions
}

export interface BuildContext {
  options: BuildOptions
  pkg: PackageJson
  buildEntries: {
    path: string
    bytes?: number
    exports?: string[]
    chunks?: string[]
    chunk?: boolean
    modules?: { id: string; bytes: number }[]
  }[]
  usedImports: Set<string>
  warnings: Set<string>
  hooks: Hookable<BuildHooks>
}

export type BuildPreset = BuildConfig | (() => BuildConfig)

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export interface BuildConfig
  extends DeepPartial<Omit<BuildOptions, 'entries'>> {
  entries?: (BuildEntry | string)[]
  preset?: string | BuildPreset
  hooks?: Partial<BuildHooks>
}

interface UntypedOutput {
  fileName: string
  contents: string
}

export interface UntypedOutputs {
  markdown: UntypedOutput
  schema: UntypedOutput
  defaults: UntypedOutput
  declaration?: UntypedOutput
}

interface BuildHooks {
  'build:prepare': (ctx: BuildContext) => void | Promise<void>
  'build:before': (ctx: BuildContext) => void | Promise<void>
  'build:done': (ctx: BuildContext) => void | Promise<void>

  'rollup:options': (
    ctx: BuildContext,
    options: RollupOptions
  ) => void | Promise<void>
  'rollup:build': (
    ctx: BuildContext,
    build: RollupBuild
  ) => void | Promise<void>
  'rollup:dts:options': (
    ctx: BuildContext,
    options: RollupOptions
  ) => void | Promise<void>
  'rollup:dts:build': (
    ctx: BuildContext,
    build: RollupBuild
  ) => void | Promise<void>
  'rollup:done': (ctx: BuildContext) => void | Promise<void>

  'mkdist:entries': (
    ctx: BuildContext,
    entries: MkdistBuildEntry[]
  ) => void | Promise<void>
  'mkdist:entry:options': (
    ctx: BuildContext,
    entry: MkdistBuildEntry,
    options: MkdistOptions
  ) => void | Promise<void>
  'mkdist:entry:build': (
    ctx: BuildContext,
    entry: MkdistBuildEntry,
    output: { writtenFiles: string[] }
  ) => void | Promise<void>
  'mkdist:done': (ctx: BuildContext) => void | Promise<void>

  'untyped:entries': (
    ctx: BuildContext,
    entries: UntypedBuildEntry[]
  ) => void | Promise<void>
  'untyped:entry:options': (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    options: any
  ) => void | Promise<void>
  'untyped:entry:schema': (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    schema: Schema
  ) => void | Promise<void>
  'untyped:entry:outputs': (
    ctx: BuildContext,
    entry: UntypedBuildEntry,
    outputs: UntypedOutputs
  ) => void | Promise<void>
  'untyped:done': (ctx: BuildContext) => void | Promise<void>
}

export function definePreset(preset: BuildPreset): BuildPreset {
  return preset
}
