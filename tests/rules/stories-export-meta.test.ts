/**
 * @fileoverview The default export should include type checking using `satisfy Meta`
 * @author Sergey Kozlov
 */

import rule from '../../src/rules/stories-export-meta.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester({ parser: 'ts' });
ruleTester.run('stories-export-meta', rule, {
  valid: [
    `
export default {
  component: Tabs,
  title: 'Redesign/Tabs',
} satisfies Meta<typeof Tabs>
`,
  ],

  invalid: [
    {
      code: `
export default {
  component: Tabs,
  title: 'Redesign/Tabs',
};
`,
      errors: [{ messageId: 'exportDefaultTypeCheck' }],
    },
    {
      code: `
export default {
  component: Tabs,
  title: 'Redesign/Tabs',
} as Meta;
`,
      errors: [{ messageId: 'exportDefaultTypeCheck' }],
    },
    {
      code: `
export default {
  component: Tabs,
  title: 'Redesign/Tabs',
} satisfies Meta;
`,
      errors: [{ messageId: 'exportDefaultTypeCheck' }],
    },
  ],
});
