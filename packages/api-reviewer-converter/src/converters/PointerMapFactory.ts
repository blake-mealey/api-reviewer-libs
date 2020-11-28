import { Document } from 'yaml';
import { Pair, Node, YAMLMap, YAMLSeq } from 'yaml/types';
import { PointerMap } from '../api-document/IApiDocument';
import { compile } from 'json-pointer';
import { PointerData } from '../api-document/PointerData';
import { IPointerData } from '../api-document/IPointerData';

export class PointerMapFactory {
  private document: Document.Parsed;
  private pointerMap: PointerMap;

  constructor(document: Document.Parsed) {
    this.document = document;
    this.pointerMap = new Map();
  }

  private set(path: string[], data: IPointerData) {
    this.pointerMap.set(compile(path), data);
  }

  private processSeq(seq: YAMLSeq, path: string[]) {
    seq.items.forEach((item: Node, index: number) => {
      const itemPath = [...path, index.toString()];
      // TODO: Should we have a `key` range for sequences?
      this.set(itemPath, new PointerData(item.range, item.range));

      this.processNode(item, itemPath);
    });
  }

  private processMap(map: YAMLMap, path: string[]) {
    map.items.forEach((item: Pair) => {
      const itemPath = [...path, item.key.value];
      this.set(itemPath, new PointerData(item.key.range, item.value.range));

      this.processNode(item.value, itemPath);
    });
  }

  private processNode(node: Node, path: string[]) {
    if (node.type === 'MAP') {
      this.processMap(node as YAMLMap, path);
    } else if (node.type === 'SEQ') {
      this.processSeq(node as YAMLSeq, path);
    }
  }

  createPointerMap(): PointerMap {
    this.processNode(this.document.contents, []);

    return this.pointerMap;
  }
}
