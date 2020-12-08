import { YAMLMap, YAMLSeq, Node, Pair } from 'yaml/types';
import { Type } from 'yaml/util';

type WalkerCallback = (pointer: string[], node: Node) => void;

export class DocumentWalker {
  protected walkSeq(
    seq: YAMLSeq,
    path: string[],
    callback: WalkerCallback,
    maxDepth?: number
  ) {
    for (let i = 0; i < seq.items.length; i++) {
      const item = seq.items[i];
      const itemPath = [...path, i.toString()];
      callback(itemPath, item);
      if (!maxDepth || itemPath.length < maxDepth) {
        this.walkNode(item, itemPath, callback, maxDepth);
      }
    }
  }

  protected walkMap(
    map: YAMLMap,
    path: string[],
    callback: WalkerCallback,
    maxDepth?: number
  ) {
    for (let i = 0; i < map.items.length; i++) {
      const item = map.items[i] as Pair;
      const itemPath = [...path, item.key.value];
      callback(itemPath, item.value);
      if (!maxDepth || itemPath.length < maxDepth) {
        this.walkNode(item.value, itemPath, callback, maxDepth);
      }
    }
  }

  protected walkNode(
    node: Node,
    path: string[],
    callback: WalkerCallback,
    maxDepth?: number
  ) {
    if (node.type === Type.MAP) {
      this.walkMap(node as YAMLMap, path, callback, maxDepth);
    } else if (node.type === Type.SEQ) {
      this.walkSeq(node as YAMLSeq, path, callback, maxDepth);
    }
  }

  walk(node: Node, callback: WalkerCallback, maxDepth?: number) {
    this.walkNode(node, [], callback, maxDepth);
  }

  shallowWalk(node: Node, callback: WalkerCallback) {
    this.walk(node, callback, 1);
  }
}
