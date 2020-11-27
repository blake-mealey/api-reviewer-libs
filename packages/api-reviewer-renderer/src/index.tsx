import * as React from 'react';

import { IApiDocumentNode } from 'api-reviewer-converter/src/api-document/IApiDocumentNode';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';

interface NodeProps {
  node?: IApiDocumentNode;
}

const NodeContext = React.createContext<IApiDocumentNode | undefined>(
  undefined
);

function Node({ node, children }: React.PropsWithChildren<NodeProps>) {
  return (
    <NodeContext.Provider value={node}>
      <div>{children}</div>
    </NodeContext.Provider>
  );
}

interface ApiDocumentProps {
  apiDocument: IApiDocument;
}

export const ApiDocument = ({ apiDocument }: ApiDocumentProps) => {
  return (
    <Node node={apiDocument.spec}>
      {apiDocument.spec?.name?.value}: {apiDocument.spec?.version?.value}
    </Node>
  );
};
