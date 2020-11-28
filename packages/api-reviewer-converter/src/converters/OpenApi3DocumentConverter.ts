import { ApiBlock } from '../api-document/ApiBlock';
import ApiDocumentConverter from './ApiDocumentConverter';
import { PointerMapFactory } from './PointerMapFactory';

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  convertInfoAndOpenApi() {
    this.builder.appendBlock(
      new ApiBlock(
        'Heading',
        ['info', 'title'],
        {
          text: this.document.get('info').get('title'),
          level: 'title',
        },
        [
          new ApiBlock('Tag', ['info', 'version'], {
            text: `v${this.document.get('info').get('version')}`,
          }),
        ]
      )
    );

    this.builder.appendBlock(
      new ApiBlock('Heading', ['openapi'], {
        text: `openapi v${this.document.get('openapi')}`,
        level: 'subtitle',
      })
    );

    const license = this.document.get('info').get('license');
    const name = license.get('name');
    const url = license.get('url');
    let licenseText: string;
    if (name && url) {
      licenseText = `License: [${name}](${url})`;
    } else if (name) {
      licenseText = `License: ${name}`;
    } else if (url) {
      licenseText = `License: <${url}>`;
    }
    this.builder.appendBlock(
      new ApiBlock('Paragraph', ['info', 'license'], {
        text: licenseText,
      })
    );

    this.builder.appendBlock(
      new ApiBlock('Paragraph', ['info', 'description'], {
        text: this.document.get('info').get('description'),
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
