import type { FlatConfig } from 'typescript-eslint';
import type { TSESLint } from '@typescript-eslint/utils';

const FORCE_ERRORS_INSTEAD_OF_WARNS = true;

function updateRuleLevel(ruleLevel: FlatConfig.RuleLevel): FlatConfig.RuleLevel {
  switch (ruleLevel) {
    case 1:
      return 2;

    case 'warn':
      return 'error';

    default:
      return ruleLevel;
  }
}

function implementation(config: TSESLint.FlatConfig.Config): TSESLint.FlatConfig.Config {
  if (!config.rules) {
    return config;
  }
  const rules = Object.fromEntries(
    Object.entries(config.rules).map(([ruleName, ruleEntry]) => {
      if (ruleEntry === undefined) {
        return [ruleName, ruleEntry];
      }
      if (Array.isArray(ruleEntry)) {
        const [ruleLevel, ...options] = ruleEntry;
        return [ruleName, [updateRuleLevel(ruleLevel), ...options]];
      }
      return [ruleName, updateRuleLevel(ruleEntry)];
    }),
  ) as typeof config.rules;
  return { ...config, rules };
}

function convertWarnsToErrorsIfNeeded(
  configs: TSESLint.FlatConfig.Config,
): TSESLint.FlatConfig.Config;
function convertWarnsToErrorsIfNeeded(
  configs: TSESLint.FlatConfig.ConfigArray,
): TSESLint.FlatConfig.ConfigArray;
function convertWarnsToErrorsIfNeeded(
  configs: TSESLint.FlatConfig.Config | TSESLint.FlatConfig.ConfigArray,
) {
  if (!FORCE_ERRORS_INSTEAD_OF_WARNS) {
    return configs;
  }
  return Array.isArray(configs)
    ? configs.map(config => implementation(config))
    : implementation(configs);
}

export { convertWarnsToErrorsIfNeeded };
