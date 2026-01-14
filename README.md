# @dartess/eslint-plugin

A set of configs and rules for various TypeScript projects.
Based on outdated or deprecated configs `eslint-config-airbnb` and `eslint-config-airbnb-typescript`.
Also extends
* `@eslint/js` — `recommended`
* `typescript-eslint` — `strictTypeChecked` & `stylisticTypeChecked`
* `eslint-plugin-import-x` — `recommended` & `typescript`
* `@eslint-community/eslint-plugin-eslint-comments` — `recommended`
* `eslint-plugin-de-morgan` — `recommended`

Also can extends (if it is applicable)
* `eslint-plugin-react` — `recommended` & `jsx-runtime`
* `eslint-plugin-react-hooks` — `recommended`
* `@next/eslint-plugin-next` — `recommended` & `core-web-vitals`
* `eslint-config-next`
* `eslint-plugin-mobx` — `recommended`
* `eslint-plugin-storybook` — `recommended` & `csf-strict`

All of it pinched with extra configs, setups and extra rules. Just take it and use it!

### Notes

1. The package is intended for use with TypeScript (it'll be useful for plain JS, but it hasn't been weel-tested).

2. The package is intended for use only with the `flat` eslint config.

3. _(for React users)_ The package is intended for use with [React New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

## Installation

Install [ESLint](https://eslint.org/), required peer deps and the plugin itself:

```sh
npm i -D eslint \
  eslint-plugin-import-x \
  eslint-import-resolver-typescript \
  eslint-plugin-unicorn \
  eslint-plugin-decorator-position \
  eslint-plugin-de-morgan \
  typescript-eslint \
  @eslint-community/eslint-plugin-eslint-comments \
  @dartess/eslint-plugin
```

Next, also install the packages that suit your needs.

```sh
npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```
```sh
npm i -D @next/eslint-plugin-next
```
```sh
npm i -D eslint-plugin-mobx
```
```sh
npm i -D eslint-plugin-storybook
```

## Usage configs

Shared config based on `eslint-config-airbnb`, `eslint-config-airbnb-typescript`, `eslint-plugin-react/recommended`, `eslint-plugin-react/jsx-runtime`.

Edit or create `eslint.config.ts` (or `eslint.config.mts`). You probably have to install `jiti` for it.

```ts
import dartessEslintPluginRecommended from '@dartess/eslint-plugin/recommended';
import dartessEslintPluginRecommendedPostFormat from '@dartess/eslint-plugin/recommended-post-format';

// if `react` is used
import dartessEslintPluginReact from '@dartess/eslint-plugin/react';
// if `next.js` is used
import dartessEslintPluginNext from '@dartess/eslint-plugin/next';
// if `mobx` is used
import dartessEslintPluginMobx from '@dartess/eslint-plugin/mobx';
// if `storybook` is used
import dartessEslintPluginStorybook from '@dartess/eslint-plugin/storybook';

import { parseGitIgnore } from '@dartess/eslint-plugin/utils';

export default [
  parseGitIgnore(), // (optional) the easiest way to ignore all `.gitignore` files
  
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  
  ...dartessEslintPluginRecommended,
  
  // if `react` is used
  ...dartessEslintPluginReact,
  // if `next.js` is used
  ...dartessEslintPluginNext,
  // if `mobx` is used
  ...dartessEslintPluginMobx,
  // if `storybook` is used
  ...dartessEslintPluginStorybook,
  
  // <-- Put here your formatters congifs -->
  // @see `Fine Tuning` -> `Formatters` section below 
  
  ...dartessEslintPluginRecommendedPostFormat,
]

```

## Fine Tuning

### Formatting tools

If you're want to (and you should to) use formatting tools, you need to additionally install and setup something else.

Replace the `<-- Put here your formatters congifs -->` comment with the required code, beacuse we have a special config
that fine-tunes formatter behavior and should be applied afterward.

In case you for some reason don't want to use any formatting tools, you still have to put 
`...dartessEslintPluginRecommendedPostFormat` in any place of your config.

#### dprint

Use `eslint-plugin-format` with rule `format/dprint` for running `dprint` as eslint rule (you probably will want to add `eslint-config-prettier` for disabling unnecessary rules).

#### Biome

Use `eslint-config-biome` for disabling unnecessary rules.

#### Oxlint

Use `eslint-plugin-oxlint` for disabling unnecessary rules.

#### Prettier (Old School)

* Use `eslint-config-prettier` for disabling unnecessary rules.
* Or use `eslint-plugin-prettier` for running `prettier` as eslint rule.
* Or use `eslint-plugin-format` with rule `format/prettier` for running `prettier` as eslint rule (you probably will want to add `eslint-config-prettier` for disabling unnecessary rules).

### (for React users)

If you're using React, you also probably will want to add 
[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh). 
This plugin requires manual setup for you build tools.

### (for Mobx users)

If you're using Mobx with legacy decorators, you have to enable rule `mobx/missing-make-observable` manually.

## Supported Rules

Each rule has emojis denoting:

- ✅ if it belongs to the one of `recommended` configuration
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

| Name                                                                                                       | Description                                                                   | ✅ | 🔧 | 💡 |
|:-----------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:--|:---|:---|
| [strict-observable-components-declaration](docs/rules/strict-observable-components-declaration.md)         | Wrapping components in `observer` must comply with the regulations.           | ✅ |    |    |
| [require-observer](docs/rules/require-observer.md)                                                         | Components using the stores must be wrapped in an `observer`                  | ✅ | 🔧 |    |
| [prevent-mixing-external-and-internal-classes](docs/rules/prevent-mixing-external-and-internal-classes.md) | Prevent mixing of outer and inner classes to avoid dependency on style order. |   |    |    |
| [jsx-no-text-as-child](docs/rules/jsx-text-as-child.md)                                                    | JSX elements should not have text without translation                         |   |    |    |
| [stories-export-meta](docs/rules/stories-export-meta.md)                                                   | Storybook's Meta should be typed                                              | ✅ |    |    |
| [stories-export-typed](docs/rules/stories-export-typed.md)                                                 | Storybook's Stories should be typed                                           | ✅ |    |    |
| [max-parent-import-depth](docs/rules/max-parent-import-depth.md)                                           | Limit relative imports to a maximum parent depth.                             | ✅ |    |    |
| [ts-named-tuple-elements](docs/rules/ts-named-tuple-elements.md)                                           | Enforce (or forbid) named tuple elements                                      | ✅ |    |    |
| [mobx-sync-autorun](docs/rules/mobx-sync-autorun.md)                                           | Enforce synchronous autorun callback                                          |    |    |    |

## Code Reuse Policy

### `eslint-config-airbnb`

The package has a huge number of dependencies and will not be updated for a very long time; instead, all useful code has been copied. Configs are now considered "ours" (but remember the copyright) and can be edited.

### `eslint-config-airbnb-typescript`

Also as `eslint-config-airbnb` but also [deprecated](https://github.com/iamturns/eslint-config-airbnb-typescript?tab=readme-ov-file#this-repo-has-been-archived).

### `@next/eslint-plugin-next` and `eslint-config-next`

One of the packages does not support `flat config`. It may be removed from the repository if support appears (which is unlikely in the next many years, however).
