import { Document } from 'yaml';
import { Collection } from 'yaml/types';
import { IApiDocument } from '../api-document/IApiDocument';
import ApiDocumentBuilder from './ApiDocumentBuilder';
import { IConverterOptions } from './IConverterOptions';

abstract class ApiDocumentConverter {
  protected documentString: string;
  protected document: Document.Parsed;
  protected builder: ApiDocumentBuilder;
  protected rootNode: Collection;
  protected options: IConverterOptions;

  constructor(
    documentString: string,
    document: Document.Parsed,
    options: IConverterOptions
  ) {
    this.documentString = documentString;
    this.document = document;
    this.builder = new ApiDocumentBuilder();
    this.rootNode = document.contents as Collection;
    this.options = options;
  }

  abstract convert(): Promise<IApiDocument>;
}

export default ApiDocumentConverter;
