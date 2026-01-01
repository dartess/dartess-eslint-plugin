# TODO

remove all non-actual rules into separated configs.

https://www.npmjs.com/package/eslint-plugin-de-morgan

additional paths in import-x/no-extraneous-dependencies

remove mobx/missing-make-observable from mobx plugin

react/jsx-max-props-per-line,react/jsx-indent-props - can be replaced with prettier?

src/configs/vendor-rules/react-hooks.ts - can be replaced with recommended? add info to readme 

Check next rules and options:

```ts
'react/jsx-key': [
'error',
{
  checkFragmentShorthand: true,
},
],
```

```ts
@typescript-eslint/explicit-member-accessibility // default options?
```

```ts
      'no-restricted-syntax': [
  'error',
  {
    selector: [
      'CallExpression[callee.name="autorun"] > ArrowFunctionExpression[async="true"]',
      'CallExpression[callee.name="autorun"] > FunctionExpression[async="true"]',
    ].join(', '),
    message: 'autorun() only accepts synchronous functions',
  },
  {
    selector: [
      'MethodDefinition[value.async="true"] Decorator[expression.object.name="action"]',
      'MethodDefinition[value.async="true"] Decorator[expression.name="action"]',
      'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.object.name="action"]',
      'PropertyDefinition[value.type="ArrowFunctionExpression"][value.async="true"] Decorator[expression.name="action"]',
    ].join(', '),
    message: '@action must be synchronous function',
  },
  {
    selector: [
      "MemberExpression[property.name='Provider']",
      "Property[key.name='Provider']",
      "JSXMemberExpression[property.name='Provider']",
      "ImportSpecifier[imported.name='Provider']",
    ].join(', '),
    message: 'Prefer use Context as Provider',
  },
],
```

add `satisfies Linter.Config[];` in example?

TODOs from notes

react compiler rules from eslint-plugin-react-hooks

check unused rules

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

curly-after-prettier fix

browserslist: Chrome 93+ and Safari 15.4+ and Firefox 92+ 

// eslint-recommended only for ts
// strict-type-checked for all?