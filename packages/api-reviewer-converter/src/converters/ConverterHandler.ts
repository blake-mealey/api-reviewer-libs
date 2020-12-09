import { IApiBlock } from '../api-document/IApiBlock';

export interface IConverterHandlerContext {
  blocks: IApiBlock[];
  subPointer: string;
  add(block: IApiBlock): void;
  is<TNode>(subPointer: string, callback: (node: TNode) => void);
  has<TNode>(subPointer: string, callback: (node: TNode) => void);
  get<TNode>(subPointer: string): TNode;
  block(
    type: string,
    subPointer: string | null,
    data: Record<string, any>,
    children?: IApiBlock[]
  ): IApiBlock;
  table(rows: string[][]): string;
}

export type ConverterHandler = (context: IConverterHandlerContext) => void;

export type ConverterHandlerMap = Record<string, ConverterHandler>;
