import { Node } from 'interfaces/node';
import Parser from './parser';

export default class Interpreter {
  private ast: Node;

  constructor(code: string) {
    const tmpParser: Parser = new Parser(code);
    this.ast = tmpParser.parse();
  }

  public transform() {
    console.log(this.ast);
  }

}