import { Document } from 'yaml';
import { Collection } from 'yaml/types';
import { IApiDocument } from '../api-document/IApiDocument';
import ApiDocumentBuilder from './ApiDocumentBuilder';

abstract class ApiDocumentConverter {
  protected document: Document.Parsed;
  protected builder: ApiDocumentBuilder;
  protected rootNode: Collection;

  constructor(document: Document.Parsed) {
    this.document = document;
    this.builder = new ApiDocumentBuilder();
    this.rootNode = document.contents as Collection;
  }

  abstract convert(): IApiDocument;
}

export default ApiDocumentConverter;