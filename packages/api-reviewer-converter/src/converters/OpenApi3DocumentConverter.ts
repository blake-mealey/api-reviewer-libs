import { Document } from 'yaml';
import { Collection, Node, Pair, Scalar, YAMLMap } from 'yaml/types';
import {
  IApiDocumentNode,
  IApiDocumentValueNode,
} from '../api-document/IApiDocumentNode';
import { Range } from '../nodes/nodes';
import ApiDocumentConverter from './ApiDocumentConverter';

interface TPair<TValue> extends Pair {
  key: Scalar;
  value: TValue;
}

function getPair<TValue extends Node>(collection: Collection, key: string) {
  if (!collection) {
    return;
  }

  if (collection.type !== 'MAP') {
    throw new Error('Attempted lookup in non-map collection');
  }

  const pair: Pair = collection.items.find((pair) => pair.key.value === key);
  if (pair) {
    return {
      key: pair.key,
      value: pair.value,
    } as TPair<TValue>;
  }
}

function getPairValue<TValue extends Node>(
  collection: Collection,
  key: string
) {
  return getPair<TValue>(collection, key)?.value;
}

// Collection - MAP
// Collection - SEQ

// SCALAR - PLAIN

// PAIR

function createNode(pair: Pair, data: any): IApiDocumentNode {
  if (!pair) {
    return;
  }

  return {
    range: new Range([pair.key.range[0], pair.value.range[1]]),
    ...data,
  };
}

function createValueNode<TValue>(node: Scalar): IApiDocumentValueNode<TValue> {
  if (!node) {
    return;
  }

  return {
    range: new Range(node.range),
    value: node.value,
  };
}

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  constructor(document: Document.Parsed) {
    super(document);
  }

  private convertSpec() {
    const spec = getPair<Scalar>(this.rootNode, 'openapi');

    this.builder.setSpec(
      createNode(spec, {
        name: createValueNode(spec.key),
        version: createValueNode(spec.value),
      })
    );
  }

  private convertInfo() {
    const info = getPair<YAMLMap>(this.rootNode, 'info');
    const contact = getPair<YAMLMap>(info.value, 'contact');
    const license = getPair<YAMLMap>(info.value, 'license');

    this.builder.setInfo(
      createNode(info, {
        title: createValueNode(getPairValue<Scalar>(info?.value, 'title')),
        description: createValueNode(
          getPairValue<Scalar>(info?.value, 'description')
        ),
        termsOfService: createValueNode(
          getPairValue<Scalar>(info?.value, 'termsOfService')
        ),
        contact: createNode(contact, {
          name: createValueNode(getPairValue<Scalar>(contact?.value, 'name')),
          url: createValueNode(getPairValue<Scalar>(contact?.value, 'url')),
          email: createValueNode(getPairValue<Scalar>(contact?.value, 'email')),
        }),
        license: createNode(license, {
          name: createValueNode(getPairValue<Scalar>(license?.value, 'name')),
          url: createValueNode(getPairValue<Scalar>(license?.value, 'url')),
        }),
        version: createValueNode(getPairValue<Scalar>(info?.value, 'version')),
      })
    );
  }

  convert() {
    this.convertSpec();
    this.convertInfo();

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
