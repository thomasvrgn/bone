import { readFile, writeFile } from 'fs-extra';

export default class File {
  private fileName: string;

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