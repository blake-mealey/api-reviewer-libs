import { Document } from 'yaml';
import ApiDocumentParser from './ApiDocumentParser';
import OpenApi3DocumentParser from './OpenApi3DocumentParser';

class ApiDocumentParserFactory {
  createDocumentParser(document: Document.Parsed): ApiDocumentParser {
    const isOpenApi = document.has('openapi');

    if (isOpenApi) {
      const version: string = document.get('openapi');
      if (version.startsWith('3.')) {
        return new OpenApi3DocumentParser(document);
      }
    }

    throw new Error(
      'Unknown API document format. Currently supported formats: OpenAPI 3'
    );
  }
}

export default ApiDocumentParserFactory;
