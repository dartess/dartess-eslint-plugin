# Enforce synchronous actions

Mobx methods marked as `@action` must be synchronous: https://mobx.js.org/actions.html#asynchronous-actions

## Rule Details

Examples of **incorrect** code for this rule:

```ts
class Store {
  @action async method1() {};
  @action.bound async method2() {};
  @action method3 = async () => {};
  @action.bound method4 = async () => {};
}
```

Examples of **correct** code for this rule:

```ts
class Store {
  @action method1() {};
  @action.bound method2() {};
  @action method3 = () => {};
  @action.bound method4 = () => {};
}
```
