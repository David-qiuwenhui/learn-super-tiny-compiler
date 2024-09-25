import { describe, expect, test } from "vitest";
import { NodeTypes, RootNode, Node } from "../src/ast";
import { transformer } from "../src/transformer";

describe("transformer group", () => {
  test("transformer happy path", () => {
    const originalAST: RootNode = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [],
        },
      ],
    };

    const transformerAST = {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "add",
            },
            arguments: [],
          },
        },
      ],
    };

    expect(transformer(originalAST)).toEqual(transformerAST);
  });

  test("transformer", () => {
    const originalAST: RootNode = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };

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

    expect(transformer(originalAST)).toEqual(transformedAST);
  });
});
