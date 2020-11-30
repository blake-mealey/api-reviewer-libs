import { ApiDocumentConverterFactory } from './converters';
import { IConverterOptions } from './converters/IConverterOptions';

export async function convert(
  documentString: string,
  options?: IConverterOptions
) {
  return await new ApiDocumentConverterFactory(documentString, options)
    .createConverter()
    .convert();
}
