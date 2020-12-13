import { IConverterHandlerContext } from '../../ConverterHandler';

export function Contact({ subPointer, block, get }: IConverterHandlerContext) {
  if (subPointer === '/name') {
    return [
      block('Markdown', null, { column: 'name', text: 'Name' }),
      block('Markdown', subPointer, {
        column: 'name',
        text: get<string>(subPointer),
      }),
    ];
  }

  if (subPointer === '/url') {
    const url = get<string>(subPointer);
    return [
      block('Markdown', null, { column: 'url', text: 'URL' }),
      block('Markdown', subPointer, {
        column: 'url',
        text: `[${url}](${url})`,
      }),
    ];
  }

  if (subPointer === '/email') {
    return [
      block('Markdown', null, { column: 'email', text: 'Email' }),
      block('Markdown', subPointer, {
        column: 'email',
        text: get<string>(subPointer),
      }),
    ];
  }
}
