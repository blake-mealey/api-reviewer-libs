import { parseDocument } from 'yaml';
import { ApiDocumentConverterFactory } from './converters';

export function convert(data: string) {
  const document = parseDocument(data);
  // console.dir(document.contents, { depth: null });

  const converter = new ApiDocumentConverterFactory().createConverter(document);
  return converter.convert();
}

// import { read } from 'fs-jetpack';
// const data = read('petstore.yaml');
// const apiDocument = convert(data);
// console.dir(apiDocument, { depth: null });
