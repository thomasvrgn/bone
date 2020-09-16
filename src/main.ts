import Interpreter from 'core/interpreter';
import File from 'utils/file';
// import jsep from 'jsep';

async function main() {
  const content: string = await new File('./sample/variables.bone').read();
  const interpreted = new Interpreter(content);
  console.log(interpreted.transform());
}

main();

// const variables = {
//   author: 4
// }

// const expression: jsep.Expression = jsep('2 - (5 * 3)');

// function parseExpression (expression) {
//   if (expression.type === 'BinaryExpression') {
//     if (expression.operator === '+') return parseExpression(expression.left) + parseExpression(expression.right);
//     else if (expression.operator === '-')return parseExpression(expression.left) - parseExpression(expression.right);
//     else if (expression.operator === '*')return parseExpression(expression.left) * parseExpression(expression.right);
//     else if (expression.operator === '/')return parseExpression(expression.left) / parseExpression(expression.right);
//   } else {
//     if (expression.type === 'Literal') return expression.value;
//     return variables[expression.name];
//   }
// }

// console.log(parseExpression(expression));