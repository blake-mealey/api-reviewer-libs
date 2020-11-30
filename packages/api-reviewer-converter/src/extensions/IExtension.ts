import { ConverterHandlerMap } from '../converters/ConverterHandler';
import { ExtensionDefinition } from './ExtensionDefinition';

export interface IExtension {
  definition: ExtensionDefinition;
  handlers: ConverterHandlerMap;
}
