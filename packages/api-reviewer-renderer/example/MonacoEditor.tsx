import * as React from 'react';
import * as monaco from 'monaco-editor';
import styled from 'styled-components';

(self as any).MonacoEnvironment = {
  getWorkerUrl: function(_moduleId: any, label: string) {
    if (label === 'json') {
      return './json.worker.js';
    }
    return './editor.worker.js';
  },
};

const ContainerDiv = styled.div`
  position: fixed;
  width: calc(50% - 32px);
  height: calc(100vh - 64px);
  user-select: none;

  .monaco-editor .cursors-layer > .cursor {
    display: none !important;
  }
`;

interface MonacoEditorProps {
  value: string;
  selections?: monaco.ISelection[];
}

export const MonacoEditor: React.FunctionComponent<MonacoEditorProps> = ({
  value,
  selections,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  const [previousValue, setPreviousValue] = React.useState<string>(value);

  if (editorRef.current) {
    editorRef.current.layout();

    if (value != previousValue) {
      setPreviousValue(editorRef.current.getValue());
      editorRef.current.setValue(value);
    }

    if (selections) {
      editorRef.current.setSelections(selections);
      editorRef.current.revealLinesNearTop(
        selections[0].selectionStartLineNumber,
        selections[0].positionLineNumber
      );
    }
  }

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: value,
      language: 'yaml',
      readOnly: true,
      renderWhitespace: 'selection',
      lineNumbers: 'on',
      minimap: {
        enabled: false,
      },
    });
    editorRef.current.layout();

    editorRef.current.onDidChangeCursorSelection(e => {
      if (
        e.reason === monaco.editor.CursorChangeReason.Explicit &&
        e.oldSelections
      ) {
        editorRef.current?.setSelections(e.oldSelections);
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [containerRef]);

  return <ContainerDiv ref={containerRef}></ContainerDiv>;
};
