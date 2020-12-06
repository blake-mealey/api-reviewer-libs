import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar } from 'yaml/types';

export function Server({ has, get, add, block }: IConverterHandlerContext) {
  const url = get<Scalar>('/url');
  const description = get<Scalar>('/description');
  add(
    block('Row', null, {}, [
      url
        ? block('Markdown', '/url', {
            text: `
|URL   |
|----------|
|[${url}](${url})|`,
          })
        : null,
      description
        ? block('Markdown', '/description', {
            text: `
|Description   |
|----------|
|${description}|`,
          })
        : null,
    ])
  );

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
