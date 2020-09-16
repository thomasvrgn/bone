import { Node } from 'interfaces/node';
import Scanner from './scanner';

export default class Parser {
  private ast: Node;

  constructor(code: string) {
    const tmpAst: Node = new Scanner(code).buildAST();
    this.ast = tmpAst;
  }

  private walk(ast: Node): void {
    if (ast.type === 'block' && ast.raw === '!def') ast.type = 'definition';
    for (const child of ast.children) this.walk(child);
  }

  public parse(): Node {
    this.walk(this.ast);
    return this.ast;
  }
}