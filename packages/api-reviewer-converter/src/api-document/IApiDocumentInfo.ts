import { IApiDocumentNode, IApiDocumentValueNode } from './IApiDocumentNode';

export interface IApiDocumentInfo extends IApiDocumentNode {
  title?: IApiDocumentValueNode<string>;
  description?: IApiDocumentValueNode<string>;
  termsOfService?: IApiDocumentValueNode<string>;
  contact?: IApiContact;
  license?: IApiLicense;
  version?: IApiDocumentValueNode<string>;
}

export interface IApiContact extends IApiDocumentNode {
  name?: IApiDocumentValueNode<string>;
  url?: IApiDocumentValueNode<string>;
  email?: IApiDocumentValueNode<string>;
}

export interface IApiLicense extends IApiDocumentNode {
  name?: IApiDocumentValueNode<string>;
  url?: IApiDocumentValueNode<string>;
}
