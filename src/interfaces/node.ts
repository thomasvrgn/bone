import { Variable } from 'interfaces/variable';

export interface Node {
  type?: string,
  raw?: string,
  value?: null | any,
  id: number,
  depth: number,
  children: Array<Node | undefined>,
  variable?: Variable,
  params?: Array<object>,
}
