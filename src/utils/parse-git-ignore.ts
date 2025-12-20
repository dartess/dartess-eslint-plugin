import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import type { TSESLint } from '@typescript-eslint/utils';

export function parseGitIgnore(): TSESLint.FlatConfig.Config {
  const config = includeIgnoreFile(path.resolve('.gitignore'));
  config.ignores = config.ignores?.filter(ignore => !ignore.startsWith('!'));
  return config;
}
