import { IApiDocumentNode, IApiDocumentValueNode } from './IApiDocumentNode';

export type ApiSpecName = 'openapi';

export interface IApiDocumentSpec extends IApiDocumentNode {
  name?: IApiDocumentValueNode<ApiSpecName>;
  version?: IApiDocumentValueNode<string>;
}
