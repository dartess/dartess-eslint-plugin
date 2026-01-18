# Makes stories typing mandatory (stories-export-typed)

Forces typing of exported stories.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
export const SimpleTabs = {
  args: {
    tabs: simpleTabs,
  },
};
```

Examples of **correct** code for this rule:

```ts
export const SimpleTabs: StoryObj<typeof Tabs> = {
  args: {
    tabs: simpleTabs,
  },
};
```

```ts
type Story = StoryObj<typeof Tabs>;

export const SimpleTabs: Story = {
  args: {
    tabs: simpleTabs,
  },
};

export const TabsWithDropdown: Story = {
  args: {
    tabs: orderTabs,
  },
};

```
