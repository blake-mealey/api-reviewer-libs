import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import React from 'react';
import { SubtitleBlock } from './SubtitleBlock';

const blockComponents: Record<string, React.FunctionComponent<any>> = {
  SubtitleBlock,
};

function renderBlock(block: IApiBlock) {
  return React.createElement(blockComponents[`${block.type}Block`], {
    ...block.data,
    key: block.pointer,
  });
}

export function renderDocument(document: IApiDocument) {
  return document.blocks.map(renderBlock);
}
