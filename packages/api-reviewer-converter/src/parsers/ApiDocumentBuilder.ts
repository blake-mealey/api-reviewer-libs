import { IApiDocument } from '../api-document/IApiDocument';
import { IApiDocumentInfo } from '../api-document/IApiDocumentInfo';
import { IApiDocumentSpec } from '../api-document/IApiDocumentSpec';

class ApiDocumentBuilder {
  private document: IApiDocument;

  constructor() {
    this.document = {};
  }

  setSpec(spec: IApiDocumentSpec) {
    this.document.spec = spec;
  }

  setInfo(info: IApiDocumentInfo) {
    this.document.info = info;
  }

  build(): IApiDocument {
    return this.document;
  }
}

export default ApiDocumentBuilder;
