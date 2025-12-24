# @dartess/eslint-plugin

A set of rules for various react projects

## Installation

You'll first need to install [ESLint](https://eslint.org/) and common peer deps:

```sh
npm i -D eslint eslint-plugin-import-x eslint-import-resolver-typescript @eslint-community/eslint-plugin-eslint-comments typescript-eslint eslint-plugin-unicorn
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

Next, install `@dartess/eslint-plugin`

```sh
npm i -D @dartess/eslint-plugin
```

## Usage configs

Shared config based on `eslint-config-airbnb`, `eslint-config-airbnb-typescript`, `eslint-plugin-react/recommended`, `eslint-plugin-react/jsx-runtime`.

Edit or create `eslint.config.ts` (or `eslint.config.mts`). You probably have to install `jiti` for it.

```ts
import dartessEslintPluginRecommended from '@dartess/eslint-plugin/recommended';

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
  parseGitIgnore(), // the easiest way to ignore all `.gitignore` files
  
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
]

```

The package is intended for use with TypeScript.

The package is intended for use with [React New JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

The package is intended for use only with the `flat` eslint config.

## Next steps

If you are using React, you also probably will want to add 
[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh). 
This plugin requires manual setup for you build tools.

If you are using Mobx with legacy decorators, you have to enable rule `mobx/missing-make-observable` manually.

## Usage rules

Copy example above into your `eslint.config.ts` and remove unnecesary parts.

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@dartess/strict-observable-components-declaration": "error"
    }
}
```

## Supported Rules

Each rule has emojis denoting:

- ✅ if it belongs to the `recommended` configuration
- 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
- 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

| Name                                                                                                       | Description                                                                   | ✅ | 🔧 | 💡 |
|:-----------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------|:--|:---|:---|
| [strict-observable-components-declaration](docs/rules/strict-observable-components-declaration.md)         | Wrapping components in `observer` must comply with the regulations.           |   |    |    |
| [require-observer](docs/rules/require-observer.md)                                                         | Components using the stores must be wrapped in an `observer`                  | ✅ | 🔧 |    |
| [prevent-mixing-external-and-internal-classes](docs/rules/prevent-mixing-external-and-internal-classes.md) | Prevent mixing of outer and inner classes to avoid dependency on style order. |   |    |    |
| [jsx-no-text-as-child](docs/rules/jsx-text-as-child.md)                                                    | JSX elements should not have text without translation                         |   |    |    |
| [stories-export-meta](docs/rules/stories-export-meta.md)                                                   | Storybook's Meta should be typed                                              | ✅ |    |    |
| [stories-export-typed](docs/rules/stories-export-typed.md)                                                 | Storybook's Stories should be typed                                           | ✅ |    |    |
| [max-parent-import-depth](docs/rules/max-parent-import-depth.md)                                           | Limit relative imports to a maximum parent depth.                             | ✅ |    |    |

## Code Reuse Policy

### `eslint-config-airbnb`

The package has a huge number of dependencies and will not be updated for a very long time; instead, all useful code has been copied. Configs are now considered "ours" (but remember the copyright) and can be edited.

### `eslint-config-airbnb-typescript`

Also as `eslint-config-airbnb` but also [deprecated](https://github.com/iamturns/eslint-config-airbnb-typescript?tab=readme-ov-file#this-repo-has-been-archived).

### `@next/eslint-plugin-next` and `eslint-config-next`

One of the packages does not support `flat config`. It may be removed from the repository if support appears (which is unlikely in the next many years, however).
