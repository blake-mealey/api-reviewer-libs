import { IConverterHandlerContext } from '../../ConverterHandler';

export function Info({
  table,
  subPointer,
  block,
  get,
  convertSubPaths,
}: IConverterHandlerContext) {
  if (subPointer === '/title') {
    return block('Markdown', subPointer, {
      text: `# ${get<string>(subPointer)}`,
    });
  }

  if (subPointer === '/version') {
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['Version'], [get<string>(subPointer)]]),
    });
  }

  if (subPointer === '/license') {
    const licenseName = get<string>(`${subPointer}/name`);
    const licenseUrl = get<string>(`${subPointer}/url`);
    return block('Markdown', subPointer, {
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
    });
  }

  if (subPointer === '/contact') {
    return block('Table', subPointer, { header: 'Contact' }, [
      ...convertSubPaths(),
    ]);
  }

  if (subPointer === '/termsOfService') {
    const terms = get<string>(subPointer);
    return block('Markdown', subPointer, {
      display: 'inline-block',
      text: table([['Terms of Service'], [`[${terms}](${terms})`]]),
    });
  }

  if (subPointer === '/description') {
    return block('Markdown', subPointer, {
      text: get<string>(subPointer),
    });
  }

  return convertSubPaths;
}
