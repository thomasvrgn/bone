export enum Tokens {
  Property = 'Property',
  Word = 'Word',
  String = 'String',
  Bracket = 'Bracket',
}

export interface Token {
  token: Tokens,
  value: string,
}

export class Lexer {
  private static formatSource(source: string): string {
    return source
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('');
  }

  public static tokenize(source: string): Token[] {
    const code: string = this.formatSource(source);
    for (const char of code) {
      console.log(char);
    }
    return [];
  }
}