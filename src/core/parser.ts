import { Node } from 'interfaces/node';
import { Variable } from 'interfaces/variable';
import Scanner from 'core/scanner';
import jsep from 'jsep';

export default class Parser {
  private ast: Node;

  constructor(code: string) {
    const tmpAst: Node = new Scanner(code).buildAST();
    this.ast = tmpAst;
  }

  private splitVariables(content: string): Array<string> {
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

  private parseVariables(variable: string): Variable {
    const elements: Array<string> = variable.split('=');
    const variableName: string = elements[0].trim();
    const variableValue: string = elements.slice(1).join('=').trim();

    return {
      name: variableName,
      value: variableValue,
      expressions: jsep(variableValue),
    };
  }

  private walk(ast: Node, type?: string): void {
    if (type === 'definition') {
      for (const variable of this.splitVariables(ast.value)) {
        ast.children.push({
          type: 'variable',
          id: ast.id,
          depth: ast.depth,
          raw: variable,
          children: [],
          variable: this.parseVariables(variable),
        })
      }
    } else if (ast.type === 'text') {
      if (ast.value.startsWith('//')) ast.type = 'comment';
      else ast.value = jsep(ast.value);
    }
    if (ast.type === 'block') {
      if (ast.raw === '!def') {
        ast.type = 'definition';
      } else {
        if (ast.raw.indexOf('[') === -1) return;
        const parameters: Array<string> = this
          .splitVariables(ast.raw.slice(ast.raw.indexOf('['))
          .match(/\[.*?\]/g)
          .map((x) => x.slice(1, x.length - 1)).join(', '))
          .map((x) => x.trim());
        for (const parameter of parameters) {
          const parsedParameter = this.parseVariables(parameter).value;
          const finalParameter = {
            name: this.parseVariables(parameter).name,
            value: parsedParameter.slice(1, parsedParameter.length - 1).split(/\s+/g),
          }
          if (!ast.params) ast.params = [];
          ast.params.push(finalParameter);
        }
      }
    }
    for (const child of ast.children) {
      if (child.depth && child.id) this.walk(child, ast.type);
    };
  }

  public parse(): Node {
    this.walk(this.ast);
    return this.ast;
  }
}