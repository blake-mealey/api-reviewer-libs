import { parseDocument } from 'yaml';
import ApiDocumentConverter from './ApiDocumentConverter';
import OpenApi3DocumentConverter from './openapi-3/OpenApi3DocumentConverter';

class ApiDocumentConverterFactory {
  protected documentString: string;

  constructor(documentString: string) {
    this.documentString = documentString;
  }

  createConverter(): ApiDocumentConverter {
    const document = parseDocument(this.documentString);

    const isOpenApi = document.has('openapi');

    if (isOpenApi) {
      const version: string = document.get('openapi');
      if (version.startsWith('3.')) {
        return new OpenApi3DocumentConverter(this.documentString, document);
      }
    }

    throw new Error(
      'Unknown API document format. Currently supported formats: OpenAPI 3'
    );
  }
}

export default ApiDocumentConverterFactory;
