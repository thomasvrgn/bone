export interface Node {
  type?: string,
  value?: null | string,
  id?: number,
  depth?: number,
  children: Array<Node | undefined>,
}
