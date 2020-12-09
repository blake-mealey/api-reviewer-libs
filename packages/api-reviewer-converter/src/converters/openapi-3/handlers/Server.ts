import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar } from 'yaml/types';

export function Server({
  is,
  subPointer,
  add,
  block,
}: IConverterHandlerContext) {
  is<Scalar>('/url', url => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: `
|URL   |
|----------|
|[${url}](${url})|`,
      })
    );
  });

  is<Scalar>('/description', description => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: `
|Description   |
|----------|
|${description}|`,
      })
    );
  });
}
