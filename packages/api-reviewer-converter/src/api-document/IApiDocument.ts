import { IApiDocumentInfo } from './IApiDocumentInfo';
import { IApiDocumentSpec } from './IApiDocumentSpec';

export interface IApiDocument {
  spec?: IApiDocumentSpec;
  info?: IApiDocumentInfo;
}
