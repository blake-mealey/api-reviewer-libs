import { parseDocument } from 'yaml';
import { ApiDocumentParserFactory } from './parsers';

export function convert(data: string) {
  const document = parseDocument(data);
  // console.dir(document.contents, { depth: null });

  const parser = new ApiDocumentParserFactory().createDocumentParser(document);
  return parser.parse();
}

// import { read } from 'fs-jetpack';
// const data = read('petstore.yaml');
// const apiDocument = convert(data);
// console.dir(apiDocument, { depth: null });
