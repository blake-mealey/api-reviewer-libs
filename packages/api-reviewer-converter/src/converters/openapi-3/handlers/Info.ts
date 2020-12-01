import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar } from 'yaml/types';

export function Info({ get, has, add, block }: IConverterHandlerContext) {
  has<Scalar>('/title', title =>
    add(
      block('Heading', '/title', {
        text: title,
      })
    )
  );

  has<Scalar>('/version', version =>
    add(
      block('Markdown', '/version', {
        text: `Version: ${version}`,
      })
    )
  );

  has('/license', () => {
    const name = get<Scalar>('/license/name');
    const url = get<Scalar>('/license/url');
    const text =
      name && url ? `[${name}](${url})` : name ? name : url ? `<${url}>` : null;
    if (text) {
      add(
        block('Markdown', '/license', {
          text: `License: ${text}`,
        })
      );
    }
  });

  has<Scalar>('/description', description =>
    add(
      block('Markdown', '/description', {
        text: description,
      })
    )
  );
}
