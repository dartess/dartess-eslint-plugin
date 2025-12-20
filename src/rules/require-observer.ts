import { ESLintUtils, TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @fileoverview Require that components using specified store hooks are wrapped in observer().
 * @author Sergey Kozlov
 */

type Options = [];
type MessageIds = 'requireObserver';

function isCustomHook(fn: TSESTree.Node): boolean {
  if (fn.type === AST_NODE_TYPES.FunctionDeclaration && fn.id?.name.startsWith('use')) {
    return true;
  }
  const { parent } = fn;
  if (
    (fn.type === AST_NODE_TYPES.FunctionExpression ||
      fn.type === AST_NODE_TYPES.ArrowFunctionExpression) &&
    parent?.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.id.type === AST_NODE_TYPES.Identifier &&
    parent.id.name.startsWith('use')
  ) {
    return true;
  }
  return false;
}

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'require-observer',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require that React components using specified store hooks are wrapped in observer().',
    },
    fixable: 'code',
    schema: [],
    messages: {
      requireObserver: 'Components using hooks [{{hooks}}] must be wrapped in observer().',
    },
  },
  defaultOptions: [],
  create(context) {
    const mobxSettings = context.settings.mobx as { storeHooks?: Array<string> } | undefined;
    const hooks = Array.isArray(mobxSettings?.storeHooks) ? mobxSettings.storeHooks : [];
    if (hooks.length === 0) {
      throw new Error('Please fill settings.mobx.storeHooks');
    }

    const { sourceCode } = context;
    const program = sourceCode.ast;
    const hasObserverImport = program.body.some(
      node =>
        node.type === AST_NODE_TYPES.ImportDeclaration &&
        node.specifiers.some(
          spec =>
            spec.type === AST_NODE_TYPES.ImportSpecifier &&
            (spec.imported.type === AST_NODE_TYPES.Identifier
              ? spec.imported.name
              : spec.imported.value) === 'observer',
        ),
    );

    const hooksUsed = new Map<
      TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
      Set<string>
    >();
    const wrappedNames = new Set<string>();
    const wrappedFns = new WeakSet<TSESTree.Node>();

    return {
      CallExpression(node) {
        if (node.callee.type === AST_NODE_TYPES.Identifier && hooks.includes(node.callee.name)) {
          const ancestors = sourceCode.getAncestors(node);
          const fn = ancestors
            .slice()
            .reverse()
            .find(
              anc =>
                anc.type === AST_NODE_TYPES.FunctionDeclaration ||
                anc.type === AST_NODE_TYPES.FunctionExpression ||
                anc.type === AST_NODE_TYPES.ArrowFunctionExpression,
            ) as
            | TSESTree.FunctionDeclaration
            | TSESTree.FunctionExpression
            | TSESTree.ArrowFunctionExpression
            | undefined;
          if (fn && !isCustomHook(fn)) {
            const set = hooksUsed.get(fn) ?? new Set<string>();
            set.add(node.callee.name);
            hooksUsed.set(fn, set);
          }
        }

        if (node.callee.type === AST_NODE_TYPES.Identifier && node.callee.name === 'observer') {
          for (const arg of node.arguments) {
            if (arg.type === AST_NODE_TYPES.Identifier) {
              wrappedNames.add(arg.name);
            } else if (
              arg.type === AST_NODE_TYPES.FunctionExpression ||
              arg.type === AST_NODE_TYPES.ArrowFunctionExpression
            ) {
              wrappedFns.add(arg);
            }
          }
        }
      },

      'Program:exit': function () {
        for (const [fn, used] of hooksUsed) {
          if (isCustomHook(fn)) {
            continue;
          }
          let isWrapped = false;
          if (
            fn.type === AST_NODE_TYPES.FunctionDeclaration &&
            fn.id &&
            wrappedNames.has(fn.id.name)
          ) {
            isWrapped = true;
          }
          if (
            (fn.type === AST_NODE_TYPES.FunctionExpression ||
              fn.type === AST_NODE_TYPES.ArrowFunctionExpression) &&
            wrappedFns.has(fn)
          ) {
            isWrapped = true;
          }
          if (isWrapped) {
            continue;
          }

          context.report({
            node: fn,
            messageId: 'requireObserver',
            data: { hooks: Array.from(used).join(', ') },
            fix(fixer) {
              const fixes = [];
              if (!hasObserverImport) {
                fixes.push(
                  fixer.insertTextBefore(
                    program.body[0],
                    "import { observer } from 'mobx-react-lite';\n",
                  ),
                );
              }

              const paramsText = fn.params.map(p => sourceCode.getText(p)).join(', ');
              const bodyText = sourceCode.getText(fn.body);

              const ancestors = sourceCode.getAncestors(fn);
              const exportDecl = ancestors.find(
                a =>
                  a.type === AST_NODE_TYPES.ExportNamedDeclaration ||
                  a.type === AST_NODE_TYPES.ExportDefaultDeclaration,
              );
              const varDecl =
                fn.parent?.type === AST_NODE_TYPES.VariableDeclarator ? fn.parent.parent : null;

              if (fn.type === AST_NODE_TYPES.FunctionDeclaration && fn.id) {
                // function declaration -> const assignment
                const { name } = fn.id;
                const original = sourceCode.getText(fn);
                const replacement = `const ${name} = observer(${original});`;
                fixes.push(fixer.replaceText(fn, replacement));
              } else if (varDecl && varDecl.type === AST_NODE_TYPES.VariableDeclaration) {
                // const Name = () => {} or function expression
                const id = (fn.parent as TSESTree.VariableDeclarator).id as TSESTree.Identifier;
                const { name } = id;
                const isExport = exportDecl?.type === AST_NODE_TYPES.ExportNamedDeclaration;
                const funcExpression = `function ${name}(${paramsText}) ${bodyText}`;
                const replacementNodeText = `${isExport ? 'export ' : ''}const ${name} = observer(${funcExpression});`;
                fixes.push(fixer.replaceText(exportDecl || varDecl, replacementNodeText));
              } else {
                // default export or unnamed
                const isDefault = exportDecl?.type === AST_NODE_TYPES.ExportDefaultDeclaration;
                const funcExpression = `function(${paramsText}) ${bodyText}`;
                const replacementNodeText = `${isDefault ? 'export default ' : ''}observer(${funcExpression});`;
                fixes.push(fixer.replaceText(exportDecl || fn, replacementNodeText));
              }

              return fixes;
            },
          });
        }
      },
    };
  },
});
