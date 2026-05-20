import path from 'node:path';

import { includeIgnoreFile } from '@eslint/config-helpers';
import type { TSESLint } from '@typescript-eslint/utils';

export function parseGitIgnore(
  paths: Array<string> = ['.gitignore'],
): Array<TSESLint.FlatConfig.Config> {
  const absolutePaths = paths.map(p => path.resolve(p));

  const configs = includeIgnoreFile(absolutePaths, {
    gitignoreResolution: true,
  });

  const configArray = Array.isArray(configs) ? configs : [configs];

  return configArray.map(config => ({
    ...config,
    ignores: config.ignores?.filter(ignore => !ignore.startsWith('!')),
  }));
}
