import { NodeTypes } from "./ast";

export function codegen(node) {
  switch (node.type) {
    case NodeTypes.Program:
      return node.body.map(codegen).join("");
    case NodeTypes.ExpressionStatement:
      return codegen(node.expression) + ";";
    case NodeTypes.CallExpression:
      return (
        node.callee.name + "(" + node.arguments.map(codegen).join(", ") + ")"
      );
    case NodeTypes.NumberLiteral:
      return node.value;
  }
}
