import { Expression } from 'jsep';

export interface Node {
  type?: string,
  value?: null | string | Expression,
  id?: number,
  depth?: number,
  children: Array<Node | undefined>,
}