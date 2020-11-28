import * as React from 'react';

import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { renderDocument } from './blocks';

interface ApiDocumentProps {
  apiDocument: IApiDocument;
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  apiDocument,
}) => {
  return <>{renderDocument(apiDocument)}</>;
};
