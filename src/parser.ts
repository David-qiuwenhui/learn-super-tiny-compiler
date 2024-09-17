import { Token, TokenType } from "./tokenizer";

export enum NodeTypes {
  Root,
  Number,
  CallExpression,
}
interface Node {
  type: NodeTypes;
}

interface NumberNode extends Node {
  value: string;
}

type ChildNode = NumberNode | CallExpressionNode;

interface RootNode extends Node {
  body: ChildNode[];
}

interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Root,
    body: [],
  };
}

function createNumberNode(value): NumberNode {
  return {
    type: NodeTypes.Number,
    value,
  };
}

function createCallExpression(name): CallExpressionNode {
  return {
    params: [],
    type: NodeTypes.CallExpression,
    name,
  };
}

export function parser(tokens: Token[]) {
  let current = 0;
  const rootNode = createRootNode();

  function walk() {
    let token = tokens[current];
    if (token.type === TokenType.Number) {
      current++;
      return createNumberNode(token.value);
    }

    if (token.type === TokenType.Paren && token.value === "(") {
      token = tokens[++current];
      const node = createCallExpression(token.value);

      token = tokens[++current];
      while (!(token.type === TokenType.Paren && token.value === ")")) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new Error(`无法解析的token${token}`);
  }

  while (current < tokens.length) {
    const res = walk();
    console.log(res);

    rootNode.body.push(res);
  }
  return rootNode;
}
