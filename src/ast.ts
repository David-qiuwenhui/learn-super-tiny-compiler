export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  Program = "Program",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
  ExpressionStatement = "ExpressionStatement",
}

export interface Node {
  type: NodeTypes;
}

export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringLiteralNode extends Node {
  type: NodeTypes.StringLiteral;
  value: string;
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: ChildNode[];
}

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
  context?: ChildNode[];
}

export type ChildNode =
  | NumberLiteralNode
  | CallExpressionNode
  | StringLiteralNode;
