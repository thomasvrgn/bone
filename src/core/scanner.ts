export default class Scanner {
  private code: string;

  protected ast: any;

  constructor(code: string) {
    this.code = code
      .split(/\r?\n/g)
      .map((x) => x.trim())
      .join('');
  }

  private writeObject(parents: Array<string>, property: string, value: string | null = null) {
    if (parents.length === 0) return;
    let tmpAst: object = this.ast;
    parents.map((parent: string, index: number) => {
      if (index + 1 === parents.length) {
        return tmpAst.children.push({
          type: property.split(/:/)[0],
          value,
          id: parseInt(property.split(/:/)[1], 10),
          depth: parseInt(property.split(/:/)[2], 10),
          children: [],
        });
      }
      tmpAst = tmpAst.children.filter((x) => x.id === parseInt(parent.split(/:/)[1], 10));
      return tmpAst;
    });
  }

  public buildAST() {
    let current: string = '';
    let parents: Array<string> = [];
    let depth: number = 0;

    [...this.code].map((char, index) => {
      if (char === '{') {
        depth += 1;
        parents.push(`${current.trim()}:${index}:${depth}`);
        this.writeObject(parents, `${current.trim()}:${index}:${depth}`);
        current = '';
      } else if (char === '}') {
        if (current.trim().length > 0) {
          this.writeObject([...parents, ''], `#text:${index}:${depth}`, current.trim());
        }
        depth -= 1;
        parents = parents.slice(0, depth);
        current = '';
      } else {
        current += char;
      }
      return true;
    });
  }
}
