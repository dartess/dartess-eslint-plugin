import type { Linter } from 'eslint';

import pluginMobx from 'eslint-plugin-mobx';

const config: Linter.Config[] = [
  pluginMobx.flatConfigs.recommended,

  {
    name: '@dartess/mobx',
    rules: {
      'mobx/missing-observer': 'off', // replaced by the neater "@dartess/require-observer"
      '@dartess/strict-observable-components-declaration': 'error',
      '@dartess/require-observer': 'error',
    },
  },
];

export default config;
