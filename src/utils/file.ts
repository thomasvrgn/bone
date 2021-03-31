import { readFile, writeFile } from 'fs-extra';

export class File {
  private readonly fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public async read(): Promise<string> {
    const content: string = await readFile(this.fileName, 'utf-8');
    return content;
  }

  public async write(content: string): Promise<any> {
    await writeFile(this.fileName, content);
  }
}