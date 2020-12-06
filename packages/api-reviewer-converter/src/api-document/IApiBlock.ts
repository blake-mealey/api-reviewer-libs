export type ApiBlockData = Record<string, any>;

export interface IApiBlock {
  type: string;
  pointer?: string;
  data: ApiBlockData;
  children: IApiBlock[];
}
