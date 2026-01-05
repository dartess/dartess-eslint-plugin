# Changelog

[//]: # (https://keepachangelog.com/en/1.1.0/)

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
