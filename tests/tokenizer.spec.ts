import { describe, it, expect } from "vitest";
import { tokenizer } from "../src/tokenizer";
import { TokenType } from "../src/tokenizer";
describe("tokenizer", () => {
  it("tokenizer", () => {
    const code = `add 2 (subtract 4 2))`;
    const token = [
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: "(" },
      { type: TokenType.Name, value: "subtract" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Paren, value: ")" },
      { type: TokenType.Paren, value: ")" },
    ];
    console.log(tokenizer(code));

    expect(tokenizer(code)).toEqual(token);
  });

  it("left paren", () => {
    const code = `(`;
    const token = [{ type: TokenType.Paren, value: "(" }];
    expect(tokenizer(code)).toEqual(token);
  });

  it("right paren", () => {
    const code = `)`;
    const token = [{ type: TokenType.Paren, value: ")" }];
    expect(tokenizer(code)).toEqual(token);
  });

  it("name", () => {
    const code = `add`;
    const token = [{ type: TokenType.Name, value: "add" }];
    expect(tokenizer(code)).toEqual(token);
  });

  it("number", () => {
    const code = `123`;
    const token = [{ type: TokenType.Number, value: "123" }];
    expect(tokenizer(code)).toEqual(token);
  });

  it("number", () => {
    const code = `123 add 456`;
    const token = [
      { type: TokenType.Number, value: "123" },
      { type: TokenType.Name, value: "add" },
      { type: TokenType.Number, value: "456" },
    ];

    expect(tokenizer(code)).toEqual(token);
  });
});
