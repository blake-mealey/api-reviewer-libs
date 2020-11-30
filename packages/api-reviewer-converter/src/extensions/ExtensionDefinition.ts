interface IRef {
  $ref: string;
}

interface IExtensionProvider {
  name?: string;
  url?: string;
}

interface IExtensionDocs {
  description?: string;
  url?: string;
}

interface ISpecUsage {
  usage: 'prohibited' | 'unrestricted' | 'restricted';
  objectTypes?: string[];
}

export interface IExtensionProperty {
  summary?: string;
  description?: string;
  externalDocs?: IExtensionDocs;
  provider?: IRef | IExtensionProvider;
  schema: any;
  oas2: ISpecUsage;
  oas3: ISpecUsage;
}

export type SpecTypes = keyof Pick<IExtensionProperty, 'oas2' | 'oas3'>;

interface IExtensionNamespace extends Record<string, IExtensionProperty> {}

interface IExtensionDefinition {
  openapiExtensionFormat: string;
  components: {
    schemas?: Record<string, any>;
    providers?: Record<string, IExtensionProvider>;
    externalDocs?: Record<string, IExtensionDocs>;
  };
}

export type ExtensionDefinition = IExtensionDefinition & {
  [namespace: string]: IExtensionNamespace;
};
