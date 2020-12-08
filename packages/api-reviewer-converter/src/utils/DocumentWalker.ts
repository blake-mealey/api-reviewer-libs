import { Document } from 'yaml';
import { YAMLMap, YAMLSeq, Node, Pair } from 'yaml/types';

type WalkerCallback = (pointer: string[], node: Node) => void;

export class DocumentWalker {
  protected document: Document.Parsed;

  constructor(document: Document.Parsed) {
    this.document = document;
  }

  protected walkSeq(seq: YAMLSeq, path: string[], callback: WalkerCallback) {
    seq.items.forEach((item: Node, index: number) => {
      const itemPath = [...path, index.toString()];
      callback(itemPath, seq);
      this.walkNode(item, itemPath, callback);
    });
  }

  protected walkMap(map: YAMLMap, path: string[], callback: WalkerCallback) {
    map.items.forEach((item: Pair) => {
      const itemPath = [...path, item.key.value];
      callback(itemPath, item.value);
      this.walkNode(item.value, itemPath, callback);
    });
  }

  protected walkNode(node: Node, path: string[], callback: WalkerCallback) {
    if (node.type === 'MAP') {
      this.walkMap(node as YAMLMap, path, callback);
    } else if (node.type === 'SEQ') {
      this.walkSeq(node as YAMLSeq, path, callback);
    }
  }

  walk(callback: WalkerCallback) {
    const cb: WalkerCallback = (path, node) => {
      console.log(path, node);
      callback(path, node);
    };
    // cb([], this.document.contents);
    this.walkNode(this.document.contents, [], cb);
  }
}
