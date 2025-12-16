# Require wrap components in observer if needed (require-observer)

This rule requires that React components using specified store hooks are wrapped in `observer()` from `mobx-react-lite`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
function MyComponent() {
  const store = useStore();
  return <div>{store.value}</div>;
}
```

Examples of **correct** code for this rule:

```js
const MyComponent = observer(function MyComponent() {
  const store = useStore();
  return <div>{store.value}</div>;
});
```

## Options

This rule does not accept inline options, but requires a global ESLint setting:

```json
{
  "settings": {
    "mobx": {
      "storeHooks": ["useStore"]
    }
  }
}
```

- `storeHooks`: an array of hook names that require components to be wrapped in `observer()`.

## When Not To Use It

This rule should be disabled in projects that do not use MobX or do not require `observer()` wrapping for components.
