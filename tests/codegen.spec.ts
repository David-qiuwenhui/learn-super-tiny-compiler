import { describe, expect, test } from "vitest";
import { NodeTypes, RootNode, Node } from "../src/ast";
import { codegen } from "../src/codegen";

describe("codegen group", () => {
  test("one statement", () => {
    const transformedAST = {
      type: NodeTypes.Program,
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    expect(codegen(transformedAST)).toMatchInlineSnapshot(
      '"add(2, subtract(4, 2));"'
    );
  });

  test("two statement", () => {
    const transformedAST = {
      type: NodeTypes.Program,
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: "2",
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract",
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: "4",
                  },
                  {
                    type: "NumberLiteral",
                    value: "2",
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    expect(codegen(transformedAST)).toMatchInlineSnapshot(
      '"add(2, subtract(4, 2));add(2, subtract(4, 2));"'
    );
  });
});
