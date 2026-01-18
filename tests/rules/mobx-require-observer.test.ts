import rule from '../../src/rules/mobx-require-observer.ts';
import { makeRuleTester } from '../utils/makeRuleTester.ts';

const ruleTester = makeRuleTester({
  jsx: true,
  settings: {
    mobx: { storeHooks: ['useFeature', 'useStore'] },
  },
});

ruleTester.run('mobx-require-observer', rule, {
  valid: [
    {
      code: `
        import React from 'react';
        const Foo = () => {
          const [count, setCount] = React.useState(0);
          return <div>{count}</div>;
        };
      `,
    },
    {
      code: `
        import { observer } from 'mobx-react-lite';
        function Foo() {
          useFeature('auth');
          return <div/>;
        }
        export default observer(Foo);
      `,
    },
    {
      code: `
        export function useWrapper() {
          useFeature('aiStrategies');
        }
      `,
    },
  ],

  invalid: [
    {
      code: `
import { useFeature } from 'features';
export const Foo = () => {
  useFeature();
  return <div/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
import { useFeature } from 'features';
export const Foo = observer(function Foo() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
import { useStore } from 'store';
const Bar = () => {
  useStore();
  return <span/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useStore' } }],
      output: `
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
const Bar = observer(function Bar() {
  useStore();
  return <span/>;
});
      `,
    },
    {
      code: `
import { useFeature } from 'features';
import { useStore } from 'store';
export default () => {
  useFeature();
  useStore();
  return <div/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature, useStore' } }],
      output: `
import { observer } from 'mobx-react-lite';
import { useFeature } from 'features';
import { useStore } from 'store';
export default observer(function() {
  useFeature();
  useStore();
  return <div/>;
});
      `,
    },
  ],
});
