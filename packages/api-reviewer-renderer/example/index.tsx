import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApiDocument } from '../.';
import { convert } from 'api-reviewer-converter';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { IConverterOptions } from 'api-reviewer-converter/dist/converters/IConverterOptions';
import AddCommentIcon from '@material-ui/icons/AddCommentOutlined';
import { CircularProgress, Box, Container } from '@material-ui/core';
import styled from 'styled-components';
import { data } from './data';
import { MonacoEditor } from './MonacoEditor';
import * as monaco from 'monaco-editor';

const options: IConverterOptions = {
  extensions: [
    {
      definition: {
        openapiExtensionFormat: '0.1.0',
        'ly.redoc': {
          'x-logo': {
            summary: 'The information about API logo',
            description:
              '`x-logo` is used to specify API logo. The corresponding image is displayed just about the side-menu in Redoc',
            externalDocs: {
              url:
                'https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md#x-logo',
            },
            provider: {
              $ref: '#/components/providers/Redocly',
            },
            oas2: {
              usage: 'restricted',
              objectTypes: ['Info'],
            },
            oas3: {
              usage: 'restricted',
              objectTypes: ['Info'],
            },
            schema: {
              type: 'object',
              required: ['url'],
              properties: {
                url: {
                  type: 'string',
                  format: 'url',
                  description:
                    'The URL pointing to the spec logo. MUST be in the format of a URL. It SHOULD be an absolute URL so your API definition is usable from any location',
                },
                backgroundColor: {
                  type: 'string',
                  description:
                    'background color to be used. MUST be RGB color in [hexadecimal format] (https://en.wikipedia.org/wiki/Web_colors#Hex_triplet)',
                },
                altText: {
                  type: 'string',
                  description:
                    "Text to use for alt tag on the logo. Defaults to 'logo' if nothing is provided.",
                },
                href: {
                  type: 'string',
                  description:
                    "The URL pointing to the contact page. Default to 'info.contact.url' field of the OAS.",
                },
              },
            },
          },
        },
        components: {
          providers: {
            Redocly: {
              name: 'Redocly',
              url: 'https://redoc.ly',
            },
          },
        },
      },
      handlers: {
        Info({ is, subPointer, add, block }) {
          is('/x-logo', logo => {
            add(
              block('Markdown', subPointer, {
                text: `[![${logo.get('altText')}](${logo.get(
                  'url'
                )})](${logo.get('href')})`,
              })
            );
          });
        },
      },
    },
  ],
};

const Layout = styled(Box)`
  gap: 16px;
`;

interface MemoizedApiDocumentProps {
  document?: IApiDocument;
  setSelections(selections?: monaco.ISelection[]): void;
}

// TODO: Move memoization to lib?
const MemoizedApiDocument = React.memo<MemoizedApiDocumentProps>(
  ({ document, setSelections }) => {
    // TODO: Move loading logic to lib?
    if (!document) {
      return <CircularProgress />;
    }

    return (
      <ApiDocument
        document={document}
        actions={[
          {
            icon: <AddCommentIcon />,
            onClick(block) {
              console.log(block);
            },
          },
        ]}
        onBlockFocus={block => {
          if (block) {
            const pointerData = document.pointerMap.get(block.pointer);

            const range = pointerData?.range;
            if (range) {
              setSelections([
                {
                  selectionStartLineNumber: range.start.line,
                  selectionStartColumn: range.start.column,
                  positionLineNumber: range.end.line,
                  positionColumn: range.end.column,
                },
              ]);
            }
          } else {
            setSelections(undefined);
          }
        }}
      />
    );
  }
);

const App = () => {
  const [document, setDocument] = React.useState<IApiDocument | undefined>(
    undefined
  );
  const [selections, setSelections] = React.useState<
    monaco.ISelection[] | undefined
  >(undefined);

  React.useEffect(() => {
    // TODO: Move conversion logic to lib?
    convert(data, options).then(setDocument);
  }, []);

  return (
    <Container maxWidth="xl">
      <Layout my={4} display="flex" flexDirection="row">
        <Box width="50%">
          <MemoizedApiDocument
            document={document}
            setSelections={setSelections}
          />
        </Box>

        <Box width="50%">
          <MonacoEditor value={data} selections={selections} />
        </Box>
      </Layout>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
