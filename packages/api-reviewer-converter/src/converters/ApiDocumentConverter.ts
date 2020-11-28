import { Document } from 'yaml';
import { Collection } from 'yaml/types';
import { IApiDocument } from '../api-document/IApiDocument';
import ApiDocumentBuilder from './ApiDocumentBuilder';

abstract class ApiDocumentConverter {
  protected documentString: string;
  protected document: Document.Parsed;
  protected builder: ApiDocumentBuilder;
  protected rootNode: Collection;

  constructor(documentString: string, document: Document.Parsed) {
    this.documentString = documentString;
    this.document = document;
    this.builder = new ApiDocumentBuilder();
    this.rootNode = document.contents as Collection;
  }

  abstract convert(): IApiDocument;
}

export default ApiDocumentConverter;
