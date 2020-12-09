import { IConverterHandlerContext } from '../../ConverterHandler';

export function Contact({
  is,
  subPointer,
  add,
  block,
  table,
}: IConverterHandlerContext) {
  is<string>('/name', name => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['Name'], [name]]),
      })
    );
  });

  is<string>('/url', url => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['URL'], [`[${url}](${url})`]]),
      })
    );
  });

  is<string>('/email', email => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['Email'], [email]]),
      })
    );
  });
}
