import { Node } from 'interfaces/node';
import Scanner from './scanner';
import jsep from 'jsep';

export default class Parser {
  private ast: Node;

  constructor(code: string) {
    const tmpAst: Node = new Scanner(code).buildAST();
    this.ast = tmpAst;
  }

  private walk(ast: Node) {
    if (ast.type === '#text') ast.value = jsep(ast.value);
    for (const child of ast.children) this.walk(child);
  }

  public parse(): Node {
    this.walk(this.ast);
    return this.ast;
  }
}