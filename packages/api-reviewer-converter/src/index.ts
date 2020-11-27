import { parseDocument as parseYamlDocument, Document } from 'yaml';
import { read } from 'fs-jetpack';
import { IApiDocument } from './interfaces';
import ApiDocumentBuilder from './ApiDocumentBuilder';

function parseApiDocument(document: Document.Parsed): IApiDocument {
  const builder = new ApiDocumentBuilder();

  return builder.build();
}

export function convert(data: string) {
  const document = parseYamlDocument(data);
  console.dir(document.contents, { depth: null });
  return parseApiDocument(document);
}

const data = read('petstore.yaml');
const apiDocument = convert(data);

console.dir(apiDocument, { depth: null });
