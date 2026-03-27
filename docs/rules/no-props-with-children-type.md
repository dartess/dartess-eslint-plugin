# Disallow `PropsWithChildren` utility type (no-props-with-children-type)

Disallow the use of `PropsWithChildren` utility type from `@types/react`.
Prefer explicit `children` prop typing instead, as `PropsWithChildren` makes `children` optional by default,
which may hide bugs. Additionally, `children` is often narrower than `ReactNode` and should be typed explicitly.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
type ModalProps = PropsWithChildren<{ title: string }>;
```

Examples of **correct** code for this rule:

```ts
type ModalProps = {
  title: string;
  children: React.ReactNode;
};
```

```ts
type ModalProps = {
  title: string;
  children: string | number;
};
```