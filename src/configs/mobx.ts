import type { Linter } from 'eslint';
import pluginMobx from 'eslint-plugin-mobx';

const config: Array<Linter.Config> = [
  pluginMobx.flatConfigs.recommended,

  {
    name: '@dartess/mobx',
    rules: {
      'mobx/missing-observer': 'off', // replaced by the neater "@dartess/mobx-require-observer"
      'mobx/missing-make-observable': 'off', // useless with modern decorators syntax. TODO check original plugin?
      '@dartess/mobx-strict-observable-components-declaration': 'error',
      '@dartess/mobx-require-observer': 'error',
      '@dartess/mobx-sync-autorun': 'error', // TODO implement it by types?
      '@dartess/mobx-sync-action': 'error', // TODO implement it by types?
    },
  },
];

export default config;
