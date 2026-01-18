# JSX elements should not have text without translation (jsx-no-text-as-child)

This rule disallows text as child in JSX elements, except specified characters like emojis,
digits, special symbols and extra strings. This helps to ensure that JSX elements are only
used for their intended purpose of representing translated texts.

## Rule Details

Examples of **incorrect** code for this rule:

```js
<MyComponent>This is some text</MyComponent>
```

Examples of **correct** code for this rule:

```js
<MyComponent>{t(translation.someText)}</MyComponent>
```

## Options

`allowExtraStrings`: an array of strings that are allowed as text children in JSX elements.

```json
{
  "@dartess/jsx-no-text-as-child": [
    "error",
    {
      "allowExtraStrings": [
        "USDT"
      ]
    }
  ]
}
```

`allowEmoji`: a boolean flag that allows emojis as text children in JSX elements.

```json
{
  "@dartess/jsx-no-text-as-child": [
    "error",
    {
      "allowEmoji": true
    }
  ]
}
```

`allowDigits`: a boolean flag that allows digits as text children in JSX elements.

```json
{
  "@dartess/jsx-no-text-as-child": [
    "error",
    {
      "allowDigits": true
    }
  ]
}
```

`allowSpecialSymbols`: a boolean flag that allows special symbols as text children in JSX elements.

List of allowed symbols:

```
`-=[];\',./~!@#$%^&*()_+{}|:"<>?№–≈—
```

```json
{
  "@dartess/jsx-no-text-as-child": [
    "error",
    {
      "allowSpecialSymbols": true
    }
  ]
}
```

`disallowedSymbols`: allows you to prohibit some previously allowed characters


```json
{
  "@dartess/jsx-no-text-as-child": [
    "error",
    {
      "allowSpecialSymbols": true,
      "disallowedSymbols": ["~"]
    }
  ]
}
```

## When Not To Use It

This rule is followed except for those files where translations are optional
(service components, documentation components, etc.)
