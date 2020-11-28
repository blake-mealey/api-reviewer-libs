import { Document } from 'yaml';
import ApiDocumentConverter from './ApiDocumentConverter';
import OpenApi3DocumentConverter from './OpenApi3DocumentConverter';

class ApiDocumentConverterFactory {
  createConverter(document: Document.Parsed): ApiDocumentConverter {
    const isOpenApi = document.has('openapi');

    if (isOpenApi) {
      const version: string = document.get('openapi');
      if (version.startsWith('3.')) {
        return new OpenApi3DocumentConverter(document);
      }
    }

    throw new Error(
      'Unknown API document format. Currently supported formats: OpenAPI 3'
    );
  }
}

export default ApiDocumentConverterFactory;
