# Enforce using arrow functions for binging `this` to actions (mobx-no-action-bound)

Decorator `@action.bound` automatically bind methods to class instances to avoid context loss (`this`).
However, this can also be achieved by declaring methods as an properies with arrow functions.

This is the first problem with bound methods—their functionality is duplicated by native abilities.

In general, for optimization purposes, it's not recommended to bind _everything_; by default,
class methods should be on the prototype.

To resolve the dilemma of "how to avoid binding unnecessary things and avoid losing context"
the [`@typescript-eslint/unbound-method`](https://typescript-eslint.io/rules/unbound-method/) rule exists.

However, it can't detect whether a method is bound via an `@action.bound`. Therefore, it's best to avoid
using `@action.bound` at all and leave only one binding method—arrow functions with `@typescript-eslint/unbound-method`.
In this case you don't need think about it.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
class Store {
  @action.bound
  reset() {
    this.value = null;
  };
}
```

Examples of **correct** code for this rule:

```ts
class Store {
  @action
  reset = () => {
    this.value = null;
  };
}
```
