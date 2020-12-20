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