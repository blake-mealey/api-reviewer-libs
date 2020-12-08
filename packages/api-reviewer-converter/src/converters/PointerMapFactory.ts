import { Document } from 'yaml';
import { PointerMap } from '../api-document/IApiDocument';
import { compile, get } from 'json-pointer';
import { PointerData } from '../api-document/PointerData';
import {
  IDocumentPosition,
  IPointerData,
  IRange,
} from '../api-document/IPointerData';
import { DocumentWalker } from '../utils/DocumentWalker';

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

    // TODO: Optimize?
    const sub = this.documentString.substring(0, globalNumber);
    const lines = sub.split('\n');
    const lineNumber = lines.length;
    const columnNumber = lines[lines.length - 1].length + 1;
    pos = {
      line: lineNumber,
      column: columnNumber,
    };
    this.positionMap.set(globalNumber, pos);
    return pos;
  }

  findRange([globalPosition0, globalPosition1]: [number, number]): IRange {
    return {
      start: this.find(globalPosition0),
      end: this.find(globalPosition1),
    };
  }
}

export class PointerMapFactory {
  protected documentPositionFinder: DocumentPositionFinder;
  protected document: Document.Parsed;
  protected documentWalker: DocumentWalker;
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
  private lookupPointerInSchema(pointer: string[], schema: any = this.schema) {
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

  createPointerMap(): PointerMap {
    this.set(
      [''],
      new PointerData(this.documentPositionFinder.findRange([0, 0]), {
        ...this.schema,
        $ref: '#/definitions/OpenAPI',
      })
    );

    new DocumentWalker().walk(this.document.contents, (path, node) => {
      this.set(
        path,
        new PointerData(
          this.documentPositionFinder.findRange(node.range),
          this.lookupPointerInSchema([...path])
        )
      );
    });

    return this.pointerMap;
  }
}
