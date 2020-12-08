export interface IDocumentPosition {
  line: number;
  column: number;
}

export interface IRange {
  start: IDocumentPosition;
  end: IDocumentPosition;
}

export interface IPointerData {
  range: IRange;
  supportsExtensions: boolean;
  schemaName?: string;
}
