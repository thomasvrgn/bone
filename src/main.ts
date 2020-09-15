import Parser from "core/parser";

const parsed = new Parser(`test{
  bruh
}`);

console.log(parsed.parse());