# TODO

remove all non-actual rules into separated configs.

https://www.npmjs.com/package/eslint-plugin-decorator-position

https://www.npmjs.com/package/eslint-plugin-complete

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
