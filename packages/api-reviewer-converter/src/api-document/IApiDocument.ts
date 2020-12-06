import { IApiBlock } from './IApiBlock';
import { IPointerData } from './IPointerData';

export type PointerMap = Map<string, IPointerData>;

export interface IApiDocument {
  rootBlock: IApiBlock;
  pointerMap: PointerMap;
}
