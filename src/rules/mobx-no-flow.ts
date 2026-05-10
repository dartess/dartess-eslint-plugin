import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';

type Options = [];
type MessageIds = 'noFlow';

export default ESLintUtils.RuleCreator(() => '')<Options, MessageIds>({
  name: 'mobx-no-flow',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow MobX generator-based flow in favor of async/await with runInAction or @action',
    },
    messages: {
      noFlow: 'Do not use MobX flow. Use async/await with runInAction or @action instead.',
    },
    schema: [],
  },

  create(context) {
    const flowLocalNames = new Set<string>();
    const mobxNamespaces = new Set<string>();

    function isMobxSource(source: string) {
      return source === 'mobx';
    }

    return {
      // import { flow } from 'mobx'
      // import { flow as f } from 'mobx'
      // import { action, flow } from 'mobx'
      ImportDeclaration(node) {
        if (!isMobxSource(node.source.value)) {
          return;
        }

        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === 'flow'
          ) {
            context.report({ node: specifier, messageId: 'noFlow' });
            flowLocalNames.add(specifier.local.name);
          }

          if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
            mobxNamespaces.add(specifier.local.name);
          }
        }
      },

      // mobx.flow(...)
      // mobx.flow used as value (e.g. makeObservable annotation)
      MemberExpression(node) {
        if (
          node.object.type === AST_NODE_TYPES.Identifier &&
          mobxNamespaces.has(node.object.name) &&
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'flow'
        ) {
          context.report({ node, messageId: 'noFlow' });
        }
      },

      // const { flow } = mobx
      // const { flow: f } = mobx  — not common but safe to handle
      VariableDeclarator(node) {
        if (
          node.init?.type === AST_NODE_TYPES.Identifier &&
          mobxNamespaces.has(node.init.name) &&
          node.id.type === AST_NODE_TYPES.ObjectPattern
        ) {
          for (const prop of node.id.properties) {
            if (
              prop.type === AST_NODE_TYPES.Property &&
              prop.key.type === AST_NODE_TYPES.Identifier &&
              prop.key.name === 'flow'
            ) {
              context.report({ node: prop, messageId: 'noFlow' });
              if (prop.value.type === AST_NODE_TYPES.Identifier) {
                flowLocalNames.add(prop.value.name);
              }
            }
          }
        }
      },
    };
  },
});
