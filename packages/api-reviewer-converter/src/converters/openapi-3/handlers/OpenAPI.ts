import { IConverterHandlerContext } from '../../ConverterHandler';

export function OpenAPI({
  subPointer,
  block,
  get,
  convertSubPaths,
}: IConverterHandlerContext) {
  if (subPointer === '/openapi') {
    return block('Markdown', subPointer, {
      text: `###### openapi v${get<string>(subPointer)}`,
    });
  }

  if (subPointer === '/servers') {
    return block(
      'Markdown',
      subPointer,
      { text: '## Servers' },
      convertSubPaths()
    );
  }

  return convertSubPaths();
}
