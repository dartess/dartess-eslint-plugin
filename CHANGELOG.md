# Changelog

[//]: # (https://keepachangelog.com/en/1.1.0/)

## [0.12.0] - 2026-04-22

- add support for `eslint@10`. you can use both `9` and `10` versions — but choosing compatible plugin versions is up to you.
- note: some rules in new verion `@eslint-react/eslint-plugin` were disabled.
- delete rule `@dartess/jsx-no-text-as-child` as overcomplicated: use e.g. `@shopify/eslint-plugin` `jsx-no-hardcoded-content` rule instead.

## [0.11.2] - 2026-03-27

- remove throwing errors from rules
- add `unicorn/numeric-separators-style` to `recommended` config
- replace `import-x/order` with `perfectionist/sort-imports`: now sort side-effects as first group and styles as last group; please, install `eslint-plugin-perfectionist` 
- add rule `@dartess/no-props-with-children-type`: Disallow the use of PropsWithChildren utility type. Prefer explicit children prop typing instead.
- add `@dartess/no-props-with-children-type` to `react` config
- update deps

## [0.10.0] - 2026-02-23

- add rule `@dartess/mobx-no-action-bound`
- add `@dartess/mobx-no-action-bound` to `mobx` config
- change `no-sequences` option `allowInParentheses` from `true` to `false`
- allow `mobx-require-observer` without settings because `mobx` can be used without hooks

## [0.9.0] - 2026-02-03

- add `eslint-plugin-complete` to `recommended` config

## [0.8.1] - 2026-01-24

- fix `mobx-require-observer`: now it doesn't lose generics
- fix `mobx-require-observer`: now it respects directives like `'use client'`

## [0.8.0] - 2026-01-22

- All recommended warnings are converted to errors because warnings are useless.

## [0.7.1] - 2026-01-18
- rename some rules for more clear naming and consistency:

* `jsx-text-as-child` -> `jsx-no-text-as-child`
* `prevent-mixing-external-and-internal-classes` -> `jsx-no-cross-context-classes`
* `max-parent-import-depth` -> `imports-max-parent-depth`
* `strict-observable-components-declaration` -> `mobx-strict-observable-components-declaration`
* `require-observer` -> `mobx-require-observer`

Please, rename rules in your config, if you're using them directly

## [0.6.0] - 2026-01-17
- replace legacy `eslint-plugin-react` with modern `@eslint-react/eslint-plugin`

If you're using React: uninstall `eslint-plugin-react`, then install `@eslint-react/eslint-plugin` and `@stylistic/eslint-plugin`.

## [0.5.0] - 2026-01-16
- add rule `@dartess/mobx-sync-action`
- add `@dartess/mobx-sync-action` to `mobx` config

## [0.4.0] - 2026-01-15
- add rule `@dartess/mobx-sync-autorun`
- add `@dartess/mobx-sync-autorun` to `mobx` config

## [0.3.0] - 2026-01-12

- add `eslint-plugin-react-hooks:recommended` config to `react` config

## [0.2.1] - 2026-01-10

- add `recommended-post-format` config for using after formatting tools

## [0.2.0] - 2026-01-05

- improve `import-x/no-extraneous-dependencies` options
- add rule `@dartess/ts-named-tuple-elements`
- add `@dartess/ts-named-tuple-elements` to `recommended` config

## [0.1.0] - 2026-01-02

- add `eslint-plugin-de-morgan` to `recommended` config

## [0.0.9] - 2026-01-02

- remove overriding `@typescript-eslint/return-await` rule
- cleanup disabled rules
- add `prefer-object-has-own` to `recommended`: previously was disabled because of old browsers support
- apply `no-throw-literal` only for `js`-files (for `ts` files already enabled `@typescript-eslint/only-throw-error`)

## [0.0.8] - 2025-12-28

- update `README`

## [0.0.6] - 2025-12-28

- cleanup extra overrides
- add `decorator-position/decorator-position` to `recommeded`: one line — one decorator

## [0.0.5] - 2025-12-27

- remove `arrow-body-style` from 'recommeded': not relevant for typed code
- add `@typescript-eslint/consistent-type-imports` to `recommeded`: it helps with three-shaking

## [0.0.3] - 2025-12-25

- disable recommended `mobx/missing-make-observable`: this rule useless with modern decorators syntax

## [0.0.2] - 2025-12-20

- mark optional deps as "optional" in "peerDependenciesMeta"  

## [0.0.1] - 2025-12-16

- initial version
