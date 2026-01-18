# Wrapping components in `observer` must comply with the regulations (mobx-strict-observable-components-declaration)

For more convenient work and debugging, several factors must be agreed upon:
the component that is passed to the observer must have the same name as
the variable to which it is assigned. This provides two main benefits:

1. Quick jump to a component in the IDE.
2. Displaying the correct component name in devtools.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const Component = observer(function() {})
```

```js
const Component = observer(() => null)
```

```js
const fn = () => {};
const Component = observer(fn)
```

```js
console.log(observer(function Component() {}));
```

```js
const ComponentFoo = observer(function ComponentBar() {})
```

Examples of **correct** code for this rule:

```js
const Component = observer(function Component() {})
```

## Options

`ignoreObserverArg`: an array of function names whose call result is valid as an argument for the observer.

```json
{
  "@dartess/mobx-strict-observable-components-declaration": ["error", {"ignoreObserverArg": ["forwardRef"]}]
}
```

`allowedHocs`: an array of function names that are valid for use as HOC.

```json
{
  "@dartess/mobx-strict-observable-components-declaration": ["error", {"allowedHocs": ["someHocName"]}]
}
```
