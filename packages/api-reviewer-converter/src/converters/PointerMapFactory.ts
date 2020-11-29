import { Document } from 'yaml';
import { Pair, Node, YAMLMap, YAMLSeq } from 'yaml/types';
import { PointerMap } from '../api-document/IApiDocument';
import { compile, get } from 'json-pointer';
import { PointerData } from '../api-document/PointerData';
import { IDocumentPosition, IPointerData } from '../api-document/IPointerData';

class DocumentPositionFinder {
  private documentString: string;
  private positionMap: Map<number, IDocumentPosition>;

  constructor(documentString: string) {
    this.documentString = documentString;
    this.positionMap = new Map();
  }

  find(globalNumber: number) {
    let pos = this.positionMap.get(globalNumber);
    if (pos) {
      return pos;
    }

    const sub = this.documentString.substring(0, globalNumber);
    const lines = sub.split('\n');
    const lineNumber = lines.length;
    const characterNumber = lines[lines.length - 1].length + 1;
    pos = {
      line: lineNumber,
      character: characterNumber,
      global: globalNumber,
    };
    this.positionMap.set(globalNumber, pos);
    return pos;
  }

  findRange([globalPosition1, globalPosition2]: [number, number]): [
    IDocumentPosition,
    IDocumentPosition
  ] {
    return [this.find(globalPosition1), this.find(globalPosition2)];
  }
}

export class PointerMapFactory {
  protected documentPositionFinder: DocumentPositionFinder;
  protected document: Document.Parsed;
  protected pointerMap: PointerMap;
  protected schema: any;

  constructor(documentString: string, document: Document.Parsed, schema: any) {
    this.documentPositionFinder = new DocumentPositionFinder(documentString);
    this.document = document;
    this.pointerMap = new Map();
    this.schema = schema;
  }

  private set(path: string[], data: IPointerData) {
    this.pointerMap.set(compile(path), data);
  }

  // TODO: Pull out?
  // TODO: Fix edge cases (oneOf, anyOf, additionalProperties $refs, etc.)
  private lookupPointerInSchema(pointer: string[], schema: any) {
    if (pointer.length === 0) {
      if ('$ref' in schema && typeof schema.$ref === 'string') {
        return {
          ...schema,
          ...get(this.schema, schema.$ref.substring(1)),
        };
      }
      return schema;
    }

    const property = pointer.shift();
    if ('$ref' in schema && typeof schema.$ref === 'string') {
      const refPointer = schema.$ref.substring(1);
      schema = get(this.schema, refPointer);
    }

    if (schema.type === 'object') {
      if ('properties' in schema && typeof schema.properties === 'object') {
        if (property in schema.properties) {
          return this.lookupPointerInSchema(
            pointer,
            schema.properties[property]
          );
        }
      }
      if (
        'patternProperties' in schema &&
        typeof schema.patternProperties === 'object'
      ) {
        const pattern = Object.keys(schema.patternProperties).find(pattern =>
          new RegExp(pattern).test(property)
        );
        if (pattern) {
          return this.lookupPointerInSchema(
            pointer,
            schema.patternProperties[pattern]
          );
        }
      }
    } else if (schema.type === 'array') {
      if ('items' in schema && typeof schema.items === 'object') {
        return this.lookupPointerInSchema(pointer, schema.items);
      }
    }
  }

  private processSeq(seq: YAMLSeq, path: string[]) {
    seq.items.forEach((item: Node, index: number) => {
      const itemPath = [...path, index.toString()];
      // TODO: Should we have a `key` range for sequences?
      this.set(
        itemPath,
        new PointerData(
          this.documentPositionFinder.findRange(item.range),
          this.documentPositionFinder.findRange(item.range),
          this.lookupPointerInSchema([...itemPath], this.schema)
        )
      );

      this.processNode(item, itemPath);
    });
  }

  private processMap(map: YAMLMap, path: string[]) {
    map.items.forEach((item: Pair) => {
      const itemPath = [...path, item.key.value];
      this.set(
        itemPath,
        new PointerData(
          this.documentPositionFinder.findRange(item.key.range),
          this.documentPositionFinder.findRange(item.value.range),
          this.lookupPointerInSchema([...itemPath], this.schema)
        )
      );

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
    this.set(
      [''],
      new PointerData(
        this.documentPositionFinder.findRange([0, 0]),
        this.documentPositionFinder.findRange([0, 0]),
        {
          ...this.schema,
          $ref: '#/definitions/OpenAPI',
        }
      )
    );

    this.processNode(this.document.contents, []);

    return this.pointerMap;
  }
}
