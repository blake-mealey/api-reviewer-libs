import { IApiBlock } from '../api-document/IApiBlock';
import { IApiDocument, PointerMap } from '../api-document/IApiDocument';

class ApiDocumentBuilder {
  private blocks: IApiBlock[];
  private pointerMap: PointerMap;

  constructor() {
    this.blocks = [];
    this.pointerMap = new Map();
  }

  setPointerMap(pointerMap: PointerMap) {
    this.pointerMap = pointerMap;
  }

  appendBlocks(blocks: IApiBlock[]) {
    this.blocks.push(...blocks);
  }

  build(): IApiDocument {
    return {
      blocks: this.blocks,
      pointerMap: this.pointerMap,
    };
  }
}

export default ApiDocumentBuilder;
