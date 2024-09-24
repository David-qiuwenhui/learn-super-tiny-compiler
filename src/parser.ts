import {
  CallExpressionNode,
  NodeTypes,
  NumberLiteralNode,
  RootNode,
} from "./ast";
import { Token, TokenType } from "./tokenizer";

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

function createNumberNode(value): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
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
