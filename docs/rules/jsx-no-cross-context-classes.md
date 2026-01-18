# Prevent mixing of outer and inner classes to avoid dependency on style order (jsx-no-cross-context-classes)

Avoid mixing outer and inner classes on the same element. The import order of the style is not guaranteed,
so the order in which the style is applied is also not guaranteed.

## Rule Details

Examples of **incorrect** code for this rule:

```js
cn(styles.root, className)
```

```js
cn(styles.root, someItemClassName)
```

```js
cn(styles.root, props.className)
```

```js
cn(styles.root, props.obj.className)
```

```js
cn(styles.root, props.someItemClassName)
```

Examples of **correct** code for this rule:

```js
cn(className)
```

```js
cn(styles.root, styles.classItem)
```

## Options

`libName` _(required)_: your classname-like package name, like `classnames` or `clsx`
