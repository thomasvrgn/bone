import { HTML } from 'interfaces/html';
import { Node } from 'interfaces/node';
import { Variable } from 'interfaces/variable';
import Parser from './parser';

export default class Interpreter {
  private readonly ast: Node;

  private stack: any = {};

  constructor(code: string) {
    const tmpParser: Parser = new Parser(code);
    this.ast = tmpParser.parse();
  }

  private parseExpression(expression) {
    if (expression.type === 'BinaryExpression') {
      if (expression.operator === '+') return this.parseExpression(expression.left) + this.parseExpression(expression.right);
      if (expression.operator === '-') return this.parseExpression(expression.left) - this.parseExpression(expression.right);
      if (expression.operator === '*') return this.parseExpression(expression.left) * this.parseExpression(expression.right);
      if (expression.operator === '/') return this.parseExpression(expression.left) / this.parseExpression(expression.right);
    } else {
      if (expression.type === 'Literal') return expression.value;
      if (expression instanceof Object) return this.stack[expression.name];
      return this.stack[expression];
    }
    return null;
  }

  private walkAST(ast: Node, type: string, callback: Function): void {
    callback(ast, type);
    ast.children.map((child: Node) => {
      if (child.depth && child.id) this.walkAST(child, ast.type, callback);
      return true;
    });
  }

  public transform() {
    this.walkAST(this.ast, '', (ast: Node) => {
      if (ast.value) {
        if (ast.value instanceof Object) {
          console.log(this.parseExpression(ast.value));
        } else {
          // eslint-disable-next-line no-restricted-syntax
          ast.children.map((variable: Node) => {
            if (variable.type !== 'variable') return true;
            const params: Variable = variable.variable;
            this.stack[params.name] = this.parseExpression(params.expressions);
            return true;
          });
        }
      } else if (ast.params) {
        ast.params.map((param: HTML) => {
          param.value.map((item: string) => {
            if (!item.match(/%.*?%/g)) return null;
            item.match(/%.*?%/g).map((match: string) => {
              // eslint-disable-next-line no-param-reassign
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