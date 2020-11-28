import { ApiDocumentConverterFactory } from './converters';

export function convert(documentString: string) {
  return new ApiDocumentConverterFactory(documentString)
    .createConverter()
    .convert();
}
