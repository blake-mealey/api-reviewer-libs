import { IConverterHandlerContext } from '../../ConverterHandler';

export function Server({ subPointer, block, get }: IConverterHandlerContext) {
  if (subPointer === '/url') {
    const url = get<string>(subPointer);
    return block('Markdown', subPointer, {
      column: 'url',
      text: `[${url}](${url})`,
    });
  }

  if (subPointer === '/description') {
    return block('Markdown', subPointer, {
      column: 'description',
      text: get<string>(subPointer),
    });
  }
}
