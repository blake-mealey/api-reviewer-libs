export type ApiBlockData = Record<string, any>;

export interface IApiBlock {
  pointer: string;
  type: string;
  data: ApiBlockData;
}
