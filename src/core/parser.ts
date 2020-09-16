import { Node } from 'interfaces/node';
import Scanner from './scanner';

export default class Parser {
  private ast: Node;

  constructor(code: string) {
    const tmpAst: Node = new Scanner(code).buildAST();
    this.ast = tmpAst;
  }

  private parseVariables(content: string): Array<string> {
    const informations = {
      state: '',
      blocks: [],
      current: [],
    }
    for (const char of content) {
      if (informations.state === 'STRING::END') informations.state = '';
      if (char === '"') {
        informations.current.push('"');
        if (informations.state === 'STRING::OPEN') informations.state = 'STRING::END';
        else informations.state = 'STRING::OPEN';
      } else if (char === ',') {
        if (informations.state === '') {
          informations.blocks.push(informations.current.join(''));
          informations.current = [];
        }
        else informations.current.push(char);
      } else {
        informations.current.push(char);
      }
    }
    if (informations.current.length > 0) informations.blocks.push(informations.current.join(''))
    return informations.blocks;
  }

  private walk(ast: Node, type?: string): void {
    if (type === 'definition') {
      console.log(this.parseVariables(ast.value))
    }
    if (ast.type === 'block' && ast.raw === '!def') ast.type = 'definition';
    for (const child of ast.children) this.walk(child, ast.type);
  }

  public parse(): Node {
    this.walk(this.ast);
    return this.ast;
  }
}