/**
 * @fileoverview Stories exports should include type checking using `Story` or `StoryObj`
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/stories-export-typed.ts';

import { makeRuleTester } from './utils/makeRuleTester.ts';

const ruleTester = makeRuleTester({ parser: 'ts' });
ruleTester.run('stories-export-typed', rule, {
  valid: [
    `
export const SimpleTabs: StoryObj<typeof Tabs> = {
  args: {
    tabs: simpleTabs,
  },
};`,
    `
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
};`,
  ],

  invalid: [
    {
      code: `
export const SimpleTabs = {
  args: {
    tabs: simpleTabs,
  },
};
`,
      errors: [{ messageId: 'exportStoryType' }],
    },
  ],
});
