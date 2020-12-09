import { IConverterHandlerContext } from '../../ConverterHandler';
import { Scalar, YAMLMap } from 'yaml/types';

export function Info({ is, subPointer, add, block }: IConverterHandlerContext) {
  is<Scalar>('/title', title => {
    add(
      block('Markdown', subPointer, {
        text: `# ${title}`,
      })
    );
  });

  is<Scalar>('/version', version => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: `
|Version   |
|----------|
|${version}|`,
      })
    );
  });

  is<YAMLMap>('/license', license => {
    const licenseName = license.get('name');
    const licenseUrl = license.get('url');
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
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
    );
  });

  is<Scalar>('/description', description => {
    add(
      block('Markdown', subPointer, {
        text: description,
      })
    );
  });
}
