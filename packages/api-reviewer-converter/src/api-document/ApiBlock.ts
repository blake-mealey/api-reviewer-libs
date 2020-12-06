import { ApiBlockData, IApiBlock } from './IApiBlock';
import { compile } from 'json-pointer';

export class ApiBlock implements IApiBlock {
  type: string;
  pointer?: string;
  data: ApiBlockData;
  children: IApiBlock[];

  constructor(
    type: string,
    pointer?: string[],
    data: ApiBlockData = {},
    children: IApiBlock[] = []
  ) {
    this.type = type;
    this.pointer = pointer ? compile(pointer) : undefined;
    this.data = data;
    this.children = children;
  }
}
