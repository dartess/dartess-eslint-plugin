import tsEslint from 'typescript-eslint';
import { RuleTester } from '@typescript-eslint/rule-tester';

type RuleTesterParams = {
  jsx?: boolean;
  parser?: string;
  settings?: Record<string, unknown>;
};

function makeRuleTester({ jsx, parser, settings = {} }: RuleTesterParams = {}) {
  return new RuleTester({
    settings,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ...(parser === 'ts' && {
        parser: tsEslint.parser,
      }),
      parserOptions: {
        ecmaFeatures: { jsx },
      },
    },
  });
}

export { makeRuleTester };
