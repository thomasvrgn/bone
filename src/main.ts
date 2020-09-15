import Scanner from 'core/scanner';

const scanner = new Scanner(`test{
  bruh
}`);
console.log(scanner.buildAST());