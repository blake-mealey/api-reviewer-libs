import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar } from 'yaml/types';

export function OpenAPI({ has, add, block }: IConverterHandlerContext) {
  has<Scalar>('/openapi', openapi =>
    add(
      block('Markdown', '/openapi', {
        text: `###### openapi v${openapi}`,
      })
    )
  );

  has('/servers', () => {
    add(block('Markdown', null, { text: '## Servers' }));
  });
}
