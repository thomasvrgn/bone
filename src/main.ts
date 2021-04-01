import { readFile } from 'fs-extra';
import path from 'path';
import { Lexer } from '@core/lexer';

export async function main() {
  const sample: string = await readFile(path.join(__dirname, '..', 'sample', 'index.bone'), 'utf-8');
  const tokens = {
    String: /".*?"/,
    Comma: /,/,
    Node: /[{}]/,
    Bracket: /[[\]]/,
    Definition: /!def/,
    Operator: /[=+]/,
    Integer: /\d+/,
    Word: /\w+/,
  };
  for (const token of Lexer.tokenize(sample, tokens)) {
    console.log(token);
  }
}

main();
