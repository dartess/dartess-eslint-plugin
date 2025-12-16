// TODO: remove it after https://github.com/eslint-community/eslint-plugin-eslint-comments/pull/246

declare module '@eslint-community/eslint-plugin-eslint-comments/configs' {
  import type { Linter } from 'eslint';

  const plugin: {
    recommended: Linter.Config;
  };

  export default plugin;
}
