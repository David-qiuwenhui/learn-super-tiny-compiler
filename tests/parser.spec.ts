import { describe, expect, it } from "vitest";
import { parser } from "../src/parser";
import { TokenType, Token } from "../src/tokenizer";
import { NodeTypes } from "../src/ast";

describe("parser", () => {
  it("parser", () => {
    // 语法分析
    const tokens = [
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "subtract" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: ")" },
      { type: TokenType.Paren, value: ")" },
    ];

    const ast = {
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

    expect(parser(tokens)).toEqual(ast);
  });

  it("number", () => {
    const tokens = [
      {
        type: TokenType.Number,
        value: "2",
      },
    ];
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.NumberLiteral,
          value: "2",
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("callExpression", () => {
    // 语法分析
    const tokens = [
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Paren, value: ")" },
    ];

    const ast = {
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
              type: NodeTypes.NumberLiteral,
              value: "4",
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  it("two callExpression", () => {
    // 语法分析
    const tokens = [
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Paren, value: ")" },
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "3" },
      { type: TokenType.Number, value: "5" },
      { type: TokenType.Paren, value: ")" },
    ];

    const ast = {
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
              type: NodeTypes.NumberLiteral,
              value: "4",
            },
          ],
        },
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "3",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "5",
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });
});
