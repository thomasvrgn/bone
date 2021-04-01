export interface Token {
  token: string,
  value: string,
  end: number,
  start: number,
  line: number,
}

type Definition = Record<string, RegExp>;
type Match = [string, RegExpMatchArray];

export class Lexer {
  private static formatSource(source: string): string[] {
    return source.split(/\r?\n/g);
  }

  private static code: string[];
  private static tokens: Definition;

  private static getNearestToken(string: string, position: number, line: number): Token {
    const tokenArray = Object.entries(this.tokens);
    const choices: Match[] = [];
    for (const [name, regex] of tokenArray) {
      if (string.match(regex)) choices.push([name, string.match(regex)]);
    }
    const nearest: Match = choices.sort((a, b) => a[1].index - b[1].index)[0];
    const value = nearest[1][0];
    const start = position + nearest[1].index;
    return {
      token: nearest[0],
      value,
      start,
      end: start + nearest[1][0].length,
      line,
    };
  }

  private static lexer(
    line: number = 0,
    result: Token[] = [],
  ): Token[] {
    if (this.code[line] === undefined) return result;
    let position: number = 0;
    let source = this.code[line];
    while (source.length > 0) {
      const nearest = this.getNearestToken(source, position, line);
      source = this.code[line].slice(nearest.end);
      position = nearest.end;
      result.push(nearest);
    }
    return this.lexer(line + 1, result);
  }

  public static* tokenize(source: string, tokens: Definition) {
    this.code = this.formatSource(source);
    this.tokens = tokens;
    const container = this.lexer();
    for (const item of container) yield item;
  }
}