import { Node } from 'interfaces/node';
import Parser from './parser';

export default class Interpreter {
  private ast: Node;

  constructor(code: string) {
    const tmpParser: Parser = new Parser(code);
    this.ast = tmpParser.parse();
  }

  private walkAST(ast: Node, type: string, callback: Function) {
    callback(ast, type);
    for (const child of ast.children) {
      if (child.depth && child.id) this.walkAST(child, ast.type, callback);
    };
  }

  public transform() {
    this.walkAST(this.ast, '', (ast, type) => {
      console.log(type)
    });
  }

}