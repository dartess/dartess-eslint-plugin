// This file contains code from the `eslint-config-airbnb` project
// Original author: Jake Teton-Landis (https://twitter.com/@jitl)
// License: MIT (see LICENSE-eslint-config-airbnb.md file)
// copied from https://github.com/airbnb/javascript/blob/c25bce83be4db06e6a221d79686c485cd2ed5d5d/packages/eslint-config-airbnb/rules/react-a11y.js

import type { Linter } from 'eslint';

const rules = {
  // Enforce that all elements that require alternative text have meaningful information
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
  'jsx-a11y-x/alt-text': [
    'error',
    {
      elements: ['img', 'object', 'area', 'input[type="image"]'],
      img: [],
      object: [],
      area: [],
      'input[type="image"]': [],
    },
  ],

  // ensure <a> tags are valid
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/0745af376cdc8686d85a361ce36952b1fb1ccf6e/docs/rules/anchor-is-valid.md
  'jsx-a11y-x/anchor-is-valid': [
    'error',
    {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    },
  ],

  // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
  'jsx-a11y-x/click-events-have-key-events': 'error',

  // Elements with an interactive role and interaction handlers must be focusable
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
  'jsx-a11y-x/interactive-supports-focus': 'error',

  // Enforce that a label tag has a text label and an associated control.
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/b800f40a2a69ad48015ae9226fbe879f946757ed/docs/rules/label-has-associated-control.md
  'jsx-a11y-x/label-has-associated-control': [
    'error',
    {
      labelComponents: [],
      labelAttributes: [],
      controlComponents: [],
      assert: 'both',
      depth: 25,
    },
  ],

  // require HTML element's lang prop to be valid
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
  'jsx-a11y-x/lang': 'error',

  // A non-interactive element does not support event handlers (mouse and key handlers)
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
  'jsx-a11y-x/no-noninteractive-element-interactions': [
    'error',
    {
      handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
    },
  ],

  // Tab key navigation should be limited to elements on the page that can be interacted with.
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md
  'jsx-a11y-x/no-noninteractive-tabindex': [
    'error',
    {
      tags: [],
      roles: ['tabpanel'],
      allowExpressionValues: true,
    },
  ],

  // ensure HTML elements do not specify redundant ARIA roles
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
  'jsx-a11y-x/no-redundant-roles': [
    'error',
    {
      nav: ['navigation'],
    },
  ],

  // Enforce that DOM elements without semantic behavior not have interaction handlers
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
  'jsx-a11y-x/no-static-element-interactions': [
    'error',
    {
      handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
    },
  ],

  // Enforce that aria-hidden="true" is not set on focusable elements.
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/93f78856655696a55309440593e0948c6fb96134/docs/rules/no-aria-hidden-on-focusable.md
  'jsx-a11y-x/no-aria-hidden-on-focusable': 'error',

  // Enforces using semantic DOM elements over the ARIA role property.
  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/93f78856655696a55309440593e0948c6fb96134/docs/rules/prefer-tag-over-role.md
  'jsx-a11y-x/prefer-tag-over-role': 'error',
} satisfies Linter.RulesRecord;

export default rules;
