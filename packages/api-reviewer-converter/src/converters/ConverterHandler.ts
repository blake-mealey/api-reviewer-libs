import { Node } from 'yaml/types';
import { IApiBlock } from '../api-document/IApiBlock';

export interface IConverterHandlerContext {
  blocks: IApiBlock[];
  subPointer: string;
  add(block: IApiBlock): void;
  is<TNode extends Node>(subPointer: string, callback: (node: TNode) => void);
  has<TNode extends Node>(subPointer: string, callback: (node: TNode) => void);
  get<TNode extends Node>(subPointer: string): TNode;
  block(
    type: string,
    subPointer: string | null,
    data: Record<string, any>,
    children?: IApiBlock[]
  ): IApiBlock;
}

export type ConverterHandler = (context: IConverterHandlerContext) => void;

export type ConverterHandlerMap = Record<string, ConverterHandler>;
