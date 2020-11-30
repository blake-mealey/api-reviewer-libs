import { PointerMap } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import React, { useContext } from 'react';
import { FunctionComponent } from 'react';

const PointerMapContext = React.createContext<PointerMap | null>(null);

export const usePointerMap = () => {
  const pointerMap = useContext(PointerMapContext);
  if (!pointerMap) {
    throw new Error(
      'Attemped to use `usePointerMap` when not below a `PointerMapProvider` element'
    );
  }
  return pointerMap;
};

interface PointerMapProviderProps {
  pointerMap: PointerMap;
}

export const PointerMapProvider: FunctionComponent<PointerMapProviderProps> = ({
  pointerMap,
  children,
}) => {
  return (
    <PointerMapContext.Provider value={pointerMap}>
      {children}
    </PointerMapContext.Provider>
  );
};
