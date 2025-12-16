# Makes meta-information typing mandatory

Storybook stories should contain meta information. Thanks to this rule, meta-information will always be typed.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
export default {
    component: Tabs,
    title: 'Redesign/Tabs',
}
```

```ts
export default {
  component: Tabs,
  title: 'Redesign/Tabs',
} as Meta;
```

```ts
export default {
    component: Tabs,
    title: 'Redesign/Tabs',
} satisfies Meta;
```

Examples of **correct** code for this rule:

```ts
export default {
    component: Tabs,
    title: 'Redesign/Tabs',
} satisfies Meta<typeof Tabs>;
```
