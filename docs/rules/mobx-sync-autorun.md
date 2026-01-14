# Enforce synchronous autorun callback

Mobx `autorun` function must accept only synchronous `effect` callback.
This follows from the rules from official documentation, https://mobx.js.org/reactions.html#rules #2:  

```
Autorun tracks only the observables that are read during the synchronous execution of the provided function, but it won't track anything that happens asynchronously.
```

It would be nice to track this at the type level, but that doesn't happen at the moment.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
autorun(async () => {
  await sleep(1);
  console.log(store.value)
})
```

Examples of **correct** code for this rule:

```ts
autorun(() => {
  console.log(store.value)
})
```
