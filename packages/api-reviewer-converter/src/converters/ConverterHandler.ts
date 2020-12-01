import { Node } from 'yaml/types';
import { IApiBlock } from '../api-document/IApiBlock';

export interface IConverterHandlerContext {
  add(block: IApiBlock): void;
  has<TNode extends Node>(subPointer: string, callback: (node: TNode) => void);
  get<TNode extends Node>(subPointer: string): TNode;
  block(
    type: string,
    subPointer: string,
    data: Record<string, any>,
    children?: IApiBlock[]
  ): IApiBlock;
}

export type ConverterHandler = (context: IConverterHandlerContext) => void;

export type ConverterHandlerMap = Record<string, ConverterHandler>;
