import { IPointerData, Range } from './IPointerData';

export class PointerData implements IPointerData {
  keyRange: Range;
  valueRange: Range;
  fullRange: Range;

  constructor(keyRange: Range, valueRange: Range) {
    this.keyRange = keyRange;
    this.valueRange = valueRange;
    this.fullRange = [keyRange[0], valueRange[1]];
  }
}
