import { Expression } from 'jsep';

export interface Variable {
  name: string,
  value: string,
  expressions: Expression,
}