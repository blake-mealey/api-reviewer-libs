import { IPointerData, Range } from './IPointerData';
import { parse } from 'json-pointer';

export class PointerData implements IPointerData {
  keyRange: Range;
  valueRange: Range;
  fullRange: Range;
  supportsExtensions: boolean;
  schemaName?: string;

  constructor(keyRange: Range, valueRange: Range, schema?: any) {
    this.keyRange = keyRange;
    this.valueRange = valueRange;
    this.fullRange = [keyRange[0], valueRange[1]];

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
