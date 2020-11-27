import { Range } from '../nodes/nodes';

export interface IApiDocumentNode {
  range: Range;
}

export interface IApiDocumentValueNode<TValue> extends IApiDocumentNode {
  value?: TValue;
}
