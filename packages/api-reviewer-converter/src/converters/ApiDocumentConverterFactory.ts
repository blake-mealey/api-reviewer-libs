import { parseDocument } from 'yaml';
import ApiDocumentConverter from './ApiDocumentConverter';
import { IConverterOptions } from './IConverterOptions';
import OpenApi3DocumentConverter from './openapi-3/OpenApi3DocumentConverter';

class ApiDocumentConverterFactory {
  protected documentString: string;
  protected options: IConverterOptions;

  constructor(documentString: string, options: IConverterOptions) {
    this.documentString = documentString;
    this.options = options;
  }

  createConverter(): ApiDocumentConverter {
    const document = parseDocument(this.documentString);

    const isOpenApi = document.has('openapi');

    if (isOpenApi) {
      const version: string = document.get('openapi');
      if (version.startsWith('3.')) {
        return new OpenApi3DocumentConverter(
          this.documentString,
          document,
          this.options
        );
      }
    }

    throw new Error(
      'Unknown API document format. Currently supported formats: OpenAPI 3'
    );
  }
}

export default ApiDocumentConverterFactory;
