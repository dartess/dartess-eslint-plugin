# TODO

remove all non-actual rules into separated configs.

remove non-exist rules

Check next rules and options:

```ts
@typescript-eslint/explicit-member-accessibility // default options?
```

add `satisfies Linter.Config[];` in example?

TODOs from notes

action.bound 

@flow

https://www.npmjs.com/package/eslint-plugin-complete: 
...esLintPluginComplete.configs.recommended,
{
rules: {
'no-plusplus': 'off', // @see https://complete-ts.github.io/eslint-plugin-complete/rules/prefer-plusplus
'complete/prefer-readonly-parameter-types': 'off', // can be flase-positive for Built-in methods
'complete/require-break': 'off', // can be false-positive with TS7027
'complete/require-variadic-function-argument': 'off', // can be false-positive for third-party libs
'complete/no-mutable-return': 'off', // can be hamful
'complete/strict-undefined-functions': 'off', // prefer unicorn/no-useless-undefined
'complete/no-void-return-type': 'off', // explicit is better than implicit
'complete/format-line-comments': 'off', // can broke comments with code
},
},
+ add names for configs
+ check disabled rules (maybe it is bad because I'm going to disable some rules)

browserslist: Chrome 93+ and Safari 15.4+ and Firefox 92+

mobx w/o hooks?

https://www.eslint-react.xyz/docs/migration

make constructor -> eslint-plugin-react-refresh

react-hooks/exhaustive-deps should be error

revert jsx-a11y airbnb config removing

replace jsx-a11y with -x ?

make styles as separated group

replace throwing errors with Program(node) { context.report({ node, message }) };

eslint no comma operator

react-hooks/set-state-in-effect vs @eslint-react/hooks-extra/no-direct-set-state-in-use-effect

https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md

eslint-plugin-oxfmt and test other options
