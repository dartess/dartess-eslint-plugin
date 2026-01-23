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
        const Foo = () => {
          const [count, setCount] = useState(0);
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
export function Foo() {
  useFeature();
  return <div/>;
}
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
'use client';
export function Foo() {
  useFeature();
  return <div/>;
}
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
'use client';
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
export const Foo = () => {
  useFeature();
  return <div/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
const Bar = () => {
  useStore();
  return <span/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useStore' } }],
      output: `
import { observer } from 'mobx-react-lite';
const Bar = observer(function Bar() {
  useStore();
  return <span/>;
});
      `,
    },
    {
      code: `
export default () => {
  useFeature();
  useStore();
  return <div/>;
};
      `,
      output: `
import { observer } from 'mobx-react-lite';
export default observer(function() {
  useFeature();
  useStore();
  return <div/>;
});
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature, useStore' } }],
    },
    {
      code: `
export function Foo<T extends string>() {
  useFeature();
  return <div/>;
}
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo<T extends string>() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
export const Foo = <T extends string>() => {
  useFeature();
  return <div/>;
};
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo<T extends string>() {
  useFeature();
  return <div/>;
});
      `,
    },
    {
      code: `
export function Foo<TFoo extends string, TBar extends number>() {
  useFeature();
  return <div/>;
}
      `,
      errors: [{ messageId: 'requireObserver', data: { hooks: 'useFeature' } }],
      output: `
import { observer } from 'mobx-react-lite';
export const Foo = observer(function Foo<TFoo extends string, TBar extends number>() {
  useFeature();
  return <div/>;
});
      `,
    },
  ],
});
