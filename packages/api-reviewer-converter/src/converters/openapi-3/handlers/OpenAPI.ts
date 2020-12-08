import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar } from 'yaml/types';

export function OpenAPI({
  is,
  subPointer,
  add,
  block,
}: IConverterHandlerContext) {
  is<Scalar>('/openapi', openapi =>
    add(
      block('Markdown', subPointer, {
        text: `###### openapi v${openapi}`,
      })
    )
  );

  is('/servers', () => {
    add(block('Markdown', null, { text: '## Servers' }));
  });
}
