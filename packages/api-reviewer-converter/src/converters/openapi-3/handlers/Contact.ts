import { IConverterHandlerContext } from '../../ConverterHandler';

export function Contact({
  subPointer,
  block,
  table,
  get,
}: IConverterHandlerContext) {
  if (subPointer === '/name') {
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['Name'], [get<string>(subPointer)]]),
    });
  }

  if (subPointer === '/url') {
    const url = get<string>(subPointer);
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['URL'], [`[${url}](${url})`]]),
    });
  }

  if (subPointer === '/email') {
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['Email'], [get<string>(subPointer)]]),
    });
  }
}
