export class Range {
  start: number;
  end: number;

  constructor([start, end]: [number, number]) {
    this.start = start;
    this.end = end;
  }
}

export class Node {
  range: Range;
  value: any;
  _items: any[];

  constructor(node: any) {
    console.log(node);

    this.range = new Range(node.range);
    this.value = node.value;
    this._items = node.items;
  }

  get items() {
    return this._items?.map((item) => new NodePair(item));
  }

  find(key: string) {
    const node = this.items?.find((item) => item.key.value === key);
    if (node) {
      return new NodePair(node);
    }
  }
}

export class NodePair {
  key: Node;
  value: Node;

  constructor(pair: any) {
    this.key = new Node(pair.key);
    this.value = new Node(pair.value);
  }

  get range() {
    return new Range([this.key.range.start, this.value.range.end]);
  }
}
