import { IPointerData, IRange } from './IPointerData';
import { parse } from 'json-pointer';

export class PointerData implements IPointerData {
  range: IRange;
  supportsExtensions: boolean;
  schemaName?: string;

  constructor(range: IRange, schema?: any) {
    this.range = range;
    this.init(schema);
  }

  private init(schema?: any) {
    const patternProperties = schema?.patternProperties;
    if (!patternProperties) {
      this.supportsExtensions = false;
    } else {
      this.supportsExtensions = Object.keys(patternProperties).includes('^x-');
    }

    if (schema && '$ref' in schema && typeof schema.$ref === 'string') {
      const pointer = parse(schema.$ref.substring(1));
      this.schemaName = pointer[pointer.length - 1];
    }
  }
}
