import { IConverterHandlerContext } from '../../ConverterHandler';

export function Server({
  is,
  subPointer,
  add,
  block,
  table,
}: IConverterHandlerContext) {
  is<string>('/url', url => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['URL'], [`[${url}](${url})`]]),
      })
    );
  });

  is<string>('/description', description => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['Description'], [description]]),
      })
    );
  });
}
