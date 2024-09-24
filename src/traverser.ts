import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;

interface VisitorOption {
  enter?: MethodFn;
  exit?: MethodFn;
}

export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverse(rootNode: RootNode, visitor: Visitor) {
  // 1. 深度搜索
  // 2. visitor
  function traverseArray(array: ChildNode[] | RootNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    // enter
    const visitorObj = visitor[node.type];
    if (visitorObj && visitorObj.enter) {
      visitorObj.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      default:
        break;
    }

    // exit
    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent);
    }
  }

  traverseNode(rootNode);
}
