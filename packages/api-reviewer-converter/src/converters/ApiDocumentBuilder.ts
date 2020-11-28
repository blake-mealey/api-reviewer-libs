import { IApiBlock } from '../api-document/IApiBlock';
import { IApiDocument, PointerMap } from '../api-document/IApiDocument';

class ApiDocumentBuilder {
  private blocks: IApiBlock[];
  private pointerMap: PointerMap;

  constructor() {
    this.blocks = [];
    this.pointerMap = {};
  }

  setPointerMap(pointerMap: PointerMap) {
    this.pointerMap = pointerMap;
  }

  appendBlock(block: IApiBlock) {
    this.blocks.push(block);
  }

  build(): IApiDocument {
    return {
      blocks: this.blocks,
      pointerMap: this.pointerMap,
    };
  }
}

export default ApiDocumentBuilder;
