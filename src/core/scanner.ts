import { Node } from 'interfaces/node';

export default class Scanner {
  private code: string;

  protected ast: Node = {
    id: 0,
    depth: 0,
    children: [],
  };

  constructor(code: string) {
    this.code = code
      .split(/\r?\n/g)
      .map((x) => x.trim())
      .join('');
  }

  private writeObject(parents: string[], property: string, value: string | null = null, type: string): null | number {
    if (parents.length === 0) return null;
    let tmpAst: Node = this.ast;
    for (const index in parents) {
      const parent = parents[index]
      if (parseInt(index) + 1 === parents.length) {
        return tmpAst.children.push({
          type,
          raw: property.split(/:/)[0],
          value,
          id: Number(property.split(/:/)[1]),
          depth: Number(property.split(/:/)[2]),
          children: [],
        })
      } else {
        tmpAst = tmpAst.children.filter(x => x.id === parseInt(parent.split(/:/)[1]))[0]
      }
    }
    this.ast = tmpAst;
    return null;
  }

  public buildAST(): Node {
    let current: string = '';
    let parents: string[] = [];
    let depth: number = 0;

    [...this.code].map((char: string, index: number) => {
      if (char === '{') {
        ++depth;
        parents.push(current.trim() + ':' + index + ':' + depth);
        this.writeObject(parents, current.trim() + ':' + index + ':' + depth, null, 'block');
        current = '';
      } else if (char === '}') {
        if (current.trim().length > 0) {
          this.writeObject([...parents, ''], '#text:' + index + ':' + depth, current.trim(), 'text');
        }
        --depth;
        parents = parents.slice(0, depth);
        current = '';
      } else {
        current += char;
      }
      return true;
    });
    return this.ast;
  }
}
