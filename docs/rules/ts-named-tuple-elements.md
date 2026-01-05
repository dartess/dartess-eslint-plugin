# Enforce (or forbid) named tuple elements (ts-named-tuple-elements)

Enforces consistent usage of named elements in TypeScript tuple types.  
This rule helps improve readability, self-documentation, and maintainability of tuple types
by explicitly naming their elements instead of relying on positional meaning.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
type Location = [number, number]
```

Examples of **correct** code for this rule:

```ts
type Location = [lat: number, long: number]
```

## Options

`mode`: `always` (by default) or `never`

```json
{
  "@dartess/ts-named-tuple-elements": [
    "error",
    {
      "mode": "never"
    }
  ]
}
```

When mode is "never", tuple elements should not have names.
