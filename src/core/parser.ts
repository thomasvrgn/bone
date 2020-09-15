import { Node } from 'interfaces/node';
import Scanner from './scanner';

export default class Parser {
  private ast: Node;
  constructor(code: string) {
    const tmpAst: Node = new Scanner(code).buildAST();
    this.ast = tmpAst;
  }
}