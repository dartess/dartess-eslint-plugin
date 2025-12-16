import rule from '../../src/rules/max-parent-import-depth.ts';

import { makeRuleTester } from './utils/makeRuleTester.ts';

const ruleTester = makeRuleTester({
  jsx: true,
});

ruleTester.run('max-parent-import-depth', rule, {
  valid: [
    {
      code: "import a from './local';",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "import b from '../one-up';",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "import c from '../../two-up';",
      settings: { maxParentImportLevels: 2 },
    },
    {
      code: "export * from '../one-up';",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "export * from '../../two-up';",
      settings: { maxParentImportLevels: 2 },
    },
    {
      code: "export { foo } from '../one-up';",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "export { foo } from '../../two-up';",
      settings: { maxParentImportLevels: 2 },
    },
    {
      code: "const module = import('../one-up');",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "const module = import('../../two-up');",
      settings: { maxParentImportLevels: 2 },
    },
    {
      code: "import x from '@/components/SomeComponent';",
      settings: { maxParentImportLevels: 1 },
    },
    {
      code: "const module = import('some-package');",
      settings: { maxParentImportLevels: 1 },
    },
  ],

  invalid: [
    {
      code: "import d from '../../too-high';",
      settings: { maxParentImportLevels: 1 },
      errors: [{ messageId: 'tooDeep', data: { level: 2, maxParentImportLevels: 1 } }],
    },
    {
      code: "import e from '../../../way-too-high';",
      settings: { maxParentImportLevels: 2 },
      errors: [{ messageId: 'tooDeep', data: { level: 3, maxParentImportLevels: 2 } }],
    },
    {
      code: "export * from '../../too-high';",
      settings: { maxParentImportLevels: 1 },
      errors: [{ messageId: 'tooDeep', data: { level: 2, maxParentImportLevels: 1 } }],
    },
    {
      code: "export * from '../../../way-too-high';",
      settings: { maxParentImportLevels: 2 },
      errors: [{ messageId: 'tooDeep', data: { level: 3, maxParentImportLevels: 2 } }],
    },
    {
      code: "export { foo } from '../../too-high';",
      settings: { maxParentImportLevels: 1 },
      errors: [{ messageId: 'tooDeep', data: { level: 2, maxParentImportLevels: 1 } }],
    },
    {
      code: "export { foo } from '../../../way-too-high';",
      settings: { maxParentImportLevels: 2 },
      errors: [{ messageId: 'tooDeep', data: { level: 3, maxParentImportLevels: 2 } }],
    },
    {
      code: "const module = import('../../too-high');",
      settings: { maxParentImportLevels: 1 },
      errors: [{ messageId: 'tooDeep', data: { level: 2, maxParentImportLevels: 1 } }],
    },
    {
      code: "const module = import('../../../way-too-high');",
      settings: { maxParentImportLevels: 2 },
      errors: [{ messageId: 'tooDeep', data: { level: 3, maxParentImportLevels: 2 } }],
    },
  ],
});
