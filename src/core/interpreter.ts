import { HTML } from 'interfaces/html';
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
      else if (expression.operator === '-') return this.parseExpression(expression.left) - this.parseExpression(expression.right);
      else if (expression.operator === '*') return this.parseExpression(expression.left) * this.parseExpression(expression.right);
      else if (expression.operator === '/') return this.parseExpression(expression.left) / this.parseExpression(expression.right);
    } else {
      if (expression.type === 'Literal') return expression.value;
      if (expression instanceof Object) return this.stack[expression.name];
      return this.stack[expression];
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
      } else if (ast.params) {
        ast.params.map((param: HTML) => {
          param.value.map((item: string) => {
            if (!item.match(/%.*?%/g)) return;
            item.match(/%.*?%/g).map((match: string) => {
              item = item.replace(match, this.parseExpression(match.slice(1, match.length - 1)));
              return true;
            });
            return true;
          });
          return true;
        });
      }
    });
  }

}