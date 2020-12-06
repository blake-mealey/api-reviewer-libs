import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar, YAMLMap } from 'yaml/types';

export function Info({ get, has, add, block }: IConverterHandlerContext) {
  has<Scalar>('/title', title =>
    add(
      block('Markdown', '/title', {
        text: `# ${title}`,
      })
    )
  );

  const version = get<Scalar>('/version');

  const license = get<YAMLMap>('/license');
  const licenseName = license.get('name');
  const licenseUrl = license.get('url');

  add(
    block('Row', null, {}, [
      version
        ? block('Markdown', '/version', {
            text: `
|Version   |
|----------|
|${version}|`,
          })
        : null,
      licenseName || licenseUrl
        ? block('Markdown', '/license', {
            text: `
|License|
|-------|
|${
              licenseName && licenseUrl
                ? `[${licenseName}](${licenseUrl})`
                : licenseName
                ? licenseName
                : `<${licenseUrl}>`
            }|`,
          })
        : null,
    ])
  );

  has<Scalar>('/description', description =>
    add(
      block('Markdown', '/description', {
        text: description,
      })
    )
  );
}
