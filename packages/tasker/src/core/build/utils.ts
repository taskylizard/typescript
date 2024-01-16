import fsp from "node:fs/promises";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { dirname, resolve } from "pathe";
import jiti from "jiti";
import type { PackageJson } from "pkg-types";
import { logger as _log } from "../utils";
import { autoPreset } from "./auto";
import type { BuildPreset, BuildConfig, BuildContext } from "./types";

export const logger = _log.create({ defaults: { tag: "build" } });

export function copyDirSync(srcDir: string, destDir: string): void {
  if (!existsSync(srcDir)) return;

  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file);
    if (srcFile === destDir) {
      continue;
    }
    const destFile = resolve(destDir, file);
    const stat = statSync(srcFile);
    if (stat.isDirectory()) {
      copyDirSync(srcFile, destFile);
    } else {
      copyFileSync(srcFile, destFile);
    }
  }
}

export const copyPublicDir = (
  dir: string | boolean | undefined,
  outDir: string,
) => {
  if (!dir) return;
  copyDirSync(resolve(dir === true ? "public" : dir), outDir);
};

export async function ensuredir(path: string): Promise<void> {
  await fsp.mkdir(dirname(path), { recursive: true });
}

export function warn(ctx: BuildContext, message: string): void {
  if (ctx.warnings.has(message)) {
    return;
  }
  logger.debug(message);
  ctx.warnings.add(message);
}

export async function symlink(
  from: string,
  to: string,
  force = true,
): Promise<void> {
  await ensuredir(to);
  if (force) {
    await fsp.unlink(to).catch(() => {});
  }
  await fsp.symlink(from, to, "junction");
}

export function dumpObject(obj: Record<string, any>): string {
  return `{ ${Object.keys(obj)
    .map((key) => `${key}: ${JSON.stringify(obj[key])}`)
    .join(", ")} }`;
}

export function getpkg(id = "") {
  const s = id.split("/");
  return s[0][0] === "@" ? `${s[0]}/${s[1]}` : s[0];
}

export async function rmdir(dir: string) {
  await fsp.unlink(dir).catch(() => {});
  await fsp.rm(dir, { recursive: true, force: true }).catch(() => {});
}

export function listRecursively(path: string) {
  const filenames = new Set<string>();
  const walk = (path: string) => {
    const files = readdirSync(path);
    for (const file of files) {
      const fullPath = resolve(path, file);
      if (statSync(fullPath).isDirectory()) {
        filenames.add(`${fullPath}/`);
        walk(fullPath);
      } else {
        filenames.add(fullPath);
      }
    }
  };
  walk(path);
  return [...filenames];
}

export function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return _require(id);
  } catch (error: any) {
    if (error.code !== "MODULE_NOT_FOUND") {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return {};
  }
}

export function tryResolve(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return _require.resolve(id);
  } catch (error: any) {
    if (error.code !== "MODULE_NOT_FOUND") {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return id;
  }
}

export function resolvePreset(
  preset: string | BuildPreset,
  rootDir: string,
): BuildConfig {
  if (preset === "auto") {
    preset = autoPreset;
  } else if (typeof preset === "string") {
    preset = tryRequire(preset, rootDir) || {};
  }
  if (typeof preset === "function") {
    preset = preset();
  }
  return preset as BuildConfig;
}

export function inferExportType(
  condition: string,
  previousConditions: string[] = [],
  filename = "",
): "esm" | "cjs" {
  if (filename) {
    if (filename.endsWith(".d.ts")) {
      return "esm";
    }
    if (filename.endsWith(".mjs")) {
      return "esm";
    }
    if (filename.endsWith(".cjs")) {
      return "cjs";
    }
  }
  switch (condition) {
    case "import": {
      return "esm";
    }
    case "require": {
      return "cjs";
    }
    default: {
      if (previousConditions.length === 0) {
        // TODO: Check against type:module for default
        return "esm";
      }
      const [newCondition, ...rest] = previousConditions;
      return inferExportType(newCondition, rest, filename);
    }
  }
}

export type OutputDescriptor = { file: string; type?: "esm" | "cjs" };

export function extractExportFilenames(
  exports: PackageJson["exports"],
  conditions: string[] = [],
): OutputDescriptor[] {
  if (!exports) {
    return [];
  }
  if (typeof exports === "string") {
    return [{ file: exports, type: "esm" }];
  }
  return (
    Object.entries(exports)
      // Filter out .json subpaths such as package.json
      .filter(([subpath]) => !subpath.endsWith(".json"))
      .flatMap(([condition, exports]) =>
        typeof exports === "string"
          ? {
              file: exports,
              type: inferExportType(condition, conditions, exports),
            }
          : extractExportFilenames(exports, [...conditions, condition]),
      )
  );
}

export function arrayIncludes(arr: (string | RegExp)[], searchElement: string) {
  return arr.some((entry) =>
    entry instanceof RegExp
      ? entry.test(searchElement)
      : entry === searchElement,
  );
}

export function removeExtension(filename: string) {
  return filename.replace(/\.(js|mjs|cjs|ts|mts|cts|json|jsx|tsx)$/, "");
}