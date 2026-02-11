import type { Linter } from '@typescript-eslint/utils/ts-eslint';

import packageJson from '../package.json' with { type: 'json' };

import ruleJsxNoTextAsChild from './rules/jsx-no-text-as-child.ts';
import ruleJsxNoCrossContextClasses from './rules/jsx-no-cross-context-classes.ts';
import ruleStoriesExportMeta from './rules/stories-export-meta.ts';
import ruleStoriesExportTyped from './rules/stories-export-typed.ts';
import ruleMobxStrictObservableComponentsDeclaration from './rules/mobx-strict-observable-components-declaration.ts';
import ruleMobxRequireObserver from './rules/mobx-require-observer.ts';
import ruleMobxNoActionBound from './rules/mobx-no-action-bound.ts';
import ruleImportsMaxParentDepth from './rules/imports-max-parent-depth.ts';
import ruleTsNamedTupleElements from './rules/ts-named-tuple-elements.ts';
import ruleMobxSyncAutorun from './rules/mobx-sync-autorun.ts';
import ruleMobxSyncAction from './rules/mobx-sync-action.ts';

const plugin: Linter.Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  processors: {},
  rules: {
    'imports-max-parent-depth': ruleImportsMaxParentDepth,
    'jsx-no-cross-context-classes': ruleJsxNoCrossContextClasses,
    'jsx-no-text-as-child': ruleJsxNoTextAsChild,
    'mobx-strict-observable-components-declaration': ruleMobxStrictObservableComponentsDeclaration,
    'mobx-sync-action': ruleMobxSyncAction,
    'mobx-sync-autorun': ruleMobxSyncAutorun,
    'mobx-require-observer': ruleMobxRequireObserver,
    'mobx-no-action-bound': ruleMobxNoActionBound,
    'stories-export-typed': ruleStoriesExportTyped,
    'stories-export-meta': ruleStoriesExportMeta,
    'ts-named-tuple-elements': ruleTsNamedTupleElements,
  },
};

export default plugin;
