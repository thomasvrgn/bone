import { readFile } from 'fs-extra';
import path from 'path';
import { Lexer } from 'core/lexer';

export async function main() {
  const sample: string = await readFile(path.join(__dirname, '..', 'sample', 'index.bone'), 'utf-8');
  console.log(Lexer.tokenize(sample));
  console.log('Hello from Bone.');
}

main();
