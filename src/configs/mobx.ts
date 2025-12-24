import type { Linter } from 'eslint';
import pluginMobx from 'eslint-plugin-mobx';

const config: Array<Linter.Config> = [
  pluginMobx.flatConfigs.recommended,

  {
    name: '@dartess/mobx',
    rules: {
      'mobx/missing-observer': 'off', // replaced by the neater "@dartess/require-observer"
      'mobx/missing-make-observable': 'off', // useless with modern decorators syntax
      '@dartess/strict-observable-components-declaration': 'error',
      '@dartess/require-observer': 'error',
    },
  },
];

export default config;
