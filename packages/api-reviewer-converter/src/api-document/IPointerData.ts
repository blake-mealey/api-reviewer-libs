export interface IDocumentPosition {
  line: number;
  character: number;
  global: number;
}

export type Range = [IDocumentPosition, IDocumentPosition];

export interface IPointerData {
  range: Range;
  supportsExtensions: boolean;
  schemaName?: string;
}
