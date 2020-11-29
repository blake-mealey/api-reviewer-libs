import { ApiDocumentConverterFactory } from './converters';

export async function convert(documentString: string) {
  return await new ApiDocumentConverterFactory(documentString)
    .createConverter()
    .convert();
}
