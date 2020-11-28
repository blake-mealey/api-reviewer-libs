import { ApiBlock } from '../api-document/ApiBlock';
import ApiDocumentConverter from './ApiDocumentConverter';
import { PointerMapFactory } from './PointerMapFactory';

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  convertInfoAndOpenApi() {
    this.builder.appendBlock(
      new ApiBlock('Subtitle', ['openapi'], {
        text: `openapi v${this.document.get('openapi')}`,
      })
    );
  }

  convert() {
    this.builder.setPointerMap(
      new PointerMapFactory(this.document).createPointerMap()
    );

    this.convertInfoAndOpenApi();

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
