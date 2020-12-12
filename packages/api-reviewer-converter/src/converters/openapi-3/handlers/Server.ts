import { IConverterHandlerContext } from '../../ConverterHandler';

export function Server({
  subPointer,
  block,
  table,
  get,
}: IConverterHandlerContext) {
  if (subPointer === '/url') {
    const url = get<string>(subPointer);
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['URL'], [`[${url}](${url})`]]),
    });
  }

  if (subPointer === '/description') {
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['Description'], [get<string>(subPointer)]]),
    });
  }
}
