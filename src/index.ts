import type { ESLint, Rule } from 'eslint';

import packageJson from '../package.json' with { type: 'json' };

import ruleJsxNoTextAsChild from './rules/jsx-no-text-as-child.ts';
import ruleJsxNoCrossContextClasses from './rules/jsx-no-cross-context-classes.ts';
import ruleStoriesExportMeta from './rules/stories-export-meta.ts';
import ruleStoriesExportTyped from './rules/stories-export-typed.ts';
import ruleMobxStrictObservableComponentsDeclaration from './rules/mobx-strict-observable-components-declaration.ts';
import ruleMobxRequireObserver from './rules/mobx-require-observer.ts';
import ruleImportsMaxParentDepth from './rules/imports-max-parent-depth.ts';
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
    'imports-max-parent-depth': ruleImportsMaxParentDepth as unknown as Rule.RuleModule,
    'jsx-no-cross-context-classes': ruleJsxNoCrossContextClasses as unknown as Rule.RuleModule,
    'jsx-no-text-as-child': ruleJsxNoTextAsChild as unknown as Rule.RuleModule,
    'mobx-strict-observable-components-declaration':
      ruleMobxStrictObservableComponentsDeclaration as unknown as Rule.RuleModule,
    'mobx-sync-action': ruleMobxSyncAction as unknown as Rule.RuleModule,
    'mobx-sync-autorun': ruleMobxSyncAutorun as unknown as Rule.RuleModule,
    'mobx-require-observer': ruleMobxRequireObserver as unknown as Rule.RuleModule,
    'stories-export-typed': ruleStoriesExportTyped as unknown as Rule.RuleModule,
    'stories-export-meta': ruleStoriesExportMeta as unknown as Rule.RuleModule,
    'ts-named-tuple-elements': ruleTsNamedTupleElements as unknown as Rule.RuleModule,
  },
};

export default plugin;
