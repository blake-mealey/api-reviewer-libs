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

interface IExtensionProperty {
  summary?: string;
  description?: string;
  externalDocs?: IExtensionDocs;
  provider?: IRef | IExtensionProvider;
  schema: any;
  oas2: ISpecUsage;
  oas3: ISpecUsage;
}

interface IExtensionNamespace extends Record<string, IExtensionProperty> {}

interface IExtensionDefinition {
  openapiExtensionFormat: string;
  components: {
    schemas?: Record<string, any>;
    providers?: Record<string, IExtensionProvider>;
    externalDocs?: Record<string, IExtensionDocs>;
  };
}

type ExtensionDefinition = IExtensionDefinition & {
  [namespace: string]: IExtensionNamespace;
};

let x: ExtensionDefinition;
x['com.readme'] = {
  'x-explorer-enabled': {
    schema: {
      type: 'boolean',
      default: true,
    },
    oas2: {
      usage: 'restricted',
      objectTypes: ['OperationObject'],
    },
    oas3: {
      usage: 'restricted',
      objectTypes: ['OperationObject'],
    },
  },
};
