import { Node } from 'interfaces/node';
import Parser from './parser';

export default class Interpreter {
  private ast: Node;
  
  private stack: any = {}; 

  constructor(code: string) {
    const tmpParser: Parser = new Parser(code);
    this.ast = tmpParser.parse();
  }

  private parseExpression (expression) {
    if (expression.type === 'BinaryExpression') {
      if (expression.operator === '+') return this.parseExpression(expression.left) + this.parseExpression(expression.right);
      else if (expression.operator === '-')return this.parseExpression(expression.left) - this.parseExpression(expression.right);
      else if (expression.operator === '*')return this.parseExpression(expression.left) * this.parseExpression(expression.right);
      else if (expression.operator === '/')return this.parseExpression(expression.left) / this.parseExpression(expression.right);
    } else {
      if (expression.type === 'Literal') return expression.value;
      return this.stack[expression.name];
    }
  }

  private walkAST(ast: Node, type: string, callback: Function): void {
    callback(ast, type);
    for (const child of ast.children) {
      if (child.depth && child.id) this.walkAST(child, ast.type, callback);
    };
  }

  public transform() {
    this.walkAST(this.ast, '', (ast: Node, type: string) => {
      if (ast.value) {
        if (ast.value instanceof Object) {
          console.log(this.parseExpression(ast.value))
        } else {
          for (const variable of ast.children) {
            if (variable.type !== 'variable') continue;
            this.stack[variable.variable.name] = this.parseExpression(variable.variable.expressions);
          }
        }
      }
    });
  }

}