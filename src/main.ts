import Parser from 'core/parser';
import File from 'utils/file';

async function main() {
  const content: string = await new File('./sample/index.bone').read();
  const parsed = new Parser(content);
  await new File('./sample/index.bone.json').write(JSON.stringify(parsed.parse(), null, 2));
}

main();
