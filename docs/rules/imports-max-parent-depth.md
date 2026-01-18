# Disallow relative imports going up more than a specified number of parent directories (imports-max-parent-depth)

This rule limits the number of parent directory (../) levels allowed in import and export statements to enforce a flatter and more maintainable project structure.

Unlike `import-x/no-relative-parent-imports`, the syntax is checked, not the actual position of the import, so imports from higher directories are allowed if you use aliases.

## Rule Details

Examples of **incorrect** code for this rule:

```js
import a from '../../../way-too-high';
```

Examples of **correct** code for this rule:

```js
import a from '../../two-up';
```

## Options

This rule does not accept inline options, but requires a global ESLint setting:

```json
{
  "settings": {
    "maxParentImportLevels": 3 // default 2
  }
}
```
