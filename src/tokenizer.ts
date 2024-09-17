export enum TokenType {
  Paren,
  Name,
  Number,
}
export interface Token {
  type: TokenType;
  value: string;
}
export function tokenizer(code: string) {
  const tokens: Token[] = [];
  let current = 0;
  while (current < code.length) {
    let char = code[current];
    const whitespace = /\s/;
    if (whitespace.test(char)) {
      current++;
      continue;
    }

    if (char === "(" || char === ")") {
      tokens.push({
        type: TokenType.Paren,
        value: char,
      });

      current++;
      continue;
    }

    const LETTER = /[a-z]/i;
    if (LETTER.test(char)) {
      let token = "";
      while (LETTER.test(char) && current < code.length) {
        token += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenType.Name,
        value: token,
      });
    }

    const NUMBER = /[0-9]/;
    if (NUMBER.test(char)) {
      let token = "";
      while (NUMBER.test(char) && current < code.length) {
        token += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenType.Number,
        value: token,
      });
    }
  }
  return tokens;
}
