import { IApiBlock } from '../api-document/IApiBlock';

export interface IConverterHandlerContext {
  subPointer: string;
  get<TNode>(subPointer: string): TNode;
  block(
    type: string,
    subPointer: string | null,
    data: Record<string, any>,
    children?: IApiBlock[]
  ): IApiBlock;
  table(rows: string[][]): string;
  convertSubPaths(): IApiBlock[];
}

export type ConverterHandler = (context: IConverterHandlerContext) => void;

export type ConverterHandlerMap = Record<string, ConverterHandler>;
