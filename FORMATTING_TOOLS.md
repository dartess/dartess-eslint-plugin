# Formatting Tools

You can use various formatting tools. Replace the code `<-- Put here your formatters configs -->`
with the code for the tool you need.

The best option for formatting code from `eslint` — use package `eslint-plugin-format`.
This package supports three options: `oxfmt`, `dprint`, `prettier`. Use the tool at your own discretion.
You can find options and examples below. In these examples we use version `~2.0`.

First, install the main package:

```sh
npm i -D eslint-plugin-format
```

And import the plugin: `import format from 'eslint-plugin-format';`.

Next, place setup instead of `<-- Put here your formatters configs -->`.

## `oxfmt` — Rust-based tool for JS and TS

```ts
{
  files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
  plugins: { format },
  rules: {
    'format/oxfmt': ['error', { singleQuote: true }],
  },
},
```

You can find more options here: https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html

## `dprint` — Rust-based tool for JS, TS, CSS, HTML and other languages via plugins

You have to install additional packages for every language. For TypeScript, install the following plugin:

```sh
npm i -D @dprint/typescript
```

```ts
{
  files: ['**/*.{js,mjs,cjs,ts,mts,jsx,tsx}'],
  plugins: { format },
  rules: {
    'format/dprint': [
      'error',
      {
        language: 'typescript',
        languageOptions: {
          quoteStyle: 'preferSingle',
          'jsx.quoteStyle': 'preferDouble',
          'module.sortImportDeclarations': 'maintain',
          'module.sortExportDeclarations': 'maintain',
          'exportDeclaration.sortNamedExports': 'maintain',
          'importDeclaration.sortNamedImports': 'maintain',
        },
      },
    ],
  },
},
```

You can find more options here: https://dprint.dev/plugins/typescript/config/

You can also use a bunch of `eslint` and `dprint` for other file types,
see examples here: https://www.npmjs.com/package/eslint-plugin-format

## `prettier` — old JavaScript-based tool for JS, TS, CSS, HTML and other languages

```ts
{
  files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
  plugins: { format },
  rules: {
    'format/prettier': [
      'error',
      {
        parser: 'typescript',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
},
```

You can find more options here: https://prettier.io/docs/options

You can also use a bunch of `eslint` and `prettier` for other file types.

You can also use the `eslint-plugin-prettier` plugin if you want.

## `ESLint Stylistic`

If you don't want to use formatters at all, you can use stylistic rules from `@stylistic/eslint-plugin`.
Their settings are up to you.
