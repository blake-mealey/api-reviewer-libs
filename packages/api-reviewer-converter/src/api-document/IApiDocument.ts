import { IApiBlock } from './IApiBlock';
import { IPointerData } from './IPointerData';

export type PointerMap = Record<string, IPointerData>;

export interface IApiDocument {
  blocks: IApiBlock[];
  pointerMap: PointerMap;
}
