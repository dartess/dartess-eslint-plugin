import type { ESLint, Rule } from 'eslint';

import packageJson from '../package.json' with { type: 'json' };

import ruleJsxTextAsChildFrom from './rules/jsx-text-as-child.ts';
import rulePreventMixingExternalAndInternalClasses from './rules/prevent-mixing-external-and-internal-classes.ts';
import ruleStoriesExportMeta from './rules/stories-export-meta.ts';
import ruleStoriesExportTyped from './rules/stories-export-typed.ts';
import ruleStrictObservableComponentsDeclaration from './rules/strict-observable-components-declaration.ts';
import ruleRequireObserver from './rules/require-observer.ts';
import ruleMaxParentImportDepth from './rules/max-parent-import-depth.ts';
import ruleTsNamedTupleElements from './rules/ts-named-tuple-elements.ts';
import ruleMobxSyncAutorun from './rules/mobx-sync-autorun.ts';
import ruleMobxSyncAction from './rules/mobx-sync-action.ts';

const plugin: ESLint.Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  processors: {},
  rules: {
    'jsx-text-as-child': ruleJsxTextAsChildFrom as unknown as Rule.RuleModule,
    'prevent-mixing-external-and-internal-classes':
      rulePreventMixingExternalAndInternalClasses as unknown as Rule.RuleModule,
    'stories-export-meta': ruleStoriesExportMeta as unknown as Rule.RuleModule,
    'stories-export-typed': ruleStoriesExportTyped as unknown as Rule.RuleModule,
    'strict-observable-components-declaration':
      ruleStrictObservableComponentsDeclaration as unknown as Rule.RuleModule,
    'require-observer': ruleRequireObserver as unknown as Rule.RuleModule,
    'max-parent-import-depth': ruleMaxParentImportDepth as unknown as Rule.RuleModule,
    'ts-named-tuple-elements': ruleTsNamedTupleElements as unknown as Rule.RuleModule,
    'mobx-sync-autorun': ruleMobxSyncAutorun as unknown as Rule.RuleModule,
    'mobx-sync-action': ruleMobxSyncAction as unknown as Rule.RuleModule,
  },
};

export default plugin;
