import { IConverterHandlerContext } from '../../ConverterHandler';
import { YAMLMap } from 'yaml/types';

export function Info({
  table,
  is,
  subPointer,
  add,
  block,
}: IConverterHandlerContext) {
  is<string>('/title', title => {
    add(
      block('Markdown', subPointer, {
        text: `# ${title}`,
      })
    );
  });

  is<string>('/version', version => {
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([['Version'], [version.toString()]]),
      })
    );
  });

  is<YAMLMap>('/license', license => {
    const licenseName = license.get('name');
    const licenseUrl = license.get('url');
    add(
      block('Markdown', subPointer, {
        display: 'inline-block',
        text: table([
          ['License'],
          [
            licenseName && licenseUrl
              ? `[${licenseName}](${licenseUrl})`
              : licenseName
              ? licenseName
              : `<${licenseUrl}>`,
          ],
        ]),
      })
    );
  });

  is<string>('/description', description => {
    add(
      block('Markdown', subPointer, {
        text: description,
      })
    );
  });
}
