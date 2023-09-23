import type { FlatESLintConfigItem } from "eslint-define-config";

import { GLOB_EXCLUDE } from "../glob";

export const ignore: FlatESLintConfigItem[] = [{ ignores: GLOB_EXCLUDE }];
