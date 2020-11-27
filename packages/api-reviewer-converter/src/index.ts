import { parseDocument } from 'yaml';
import { read } from 'fs-jetpack';
import { ApiDocumentParserFactory } from './parsers';

function convert(data: string) {
  const document = parseDocument(data);
  // console.dir(document.contents, { depth: null });

  const parser = new ApiDocumentParserFactory().createDocumentParser(document);
  return parser.parse();
}

const data = read('petstore.yaml');
const apiDocument = convert(data);

console.dir(apiDocument, { depth: null });

export default convert;
