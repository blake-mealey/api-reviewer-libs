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
    return block('Table', subPointer, { header: 'Servers' }, [
      block('Markdown', null, { column: 'url', text: 'URL' }),
      block('Markdown', null, { column: 'description', text: 'Description' }),
      ...convertSubPaths(),
    ]);
  }

  return convertSubPaths();
}
