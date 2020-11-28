import ApiDocumentConverter from './ApiDocumentConverter';

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  convert() {
    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
