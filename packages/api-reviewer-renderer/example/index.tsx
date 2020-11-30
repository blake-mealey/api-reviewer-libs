import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApiDocument } from '../.';
import { convert } from 'api-reviewer-converter';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { IConverterOptions } from 'api-reviewer-converter/dist/converters/IConverterOptions';

const data = `openapi: 3.0.0
info:
  version: 1.0.0
  title: Swagger Petstore
  description: This is a description
  license:
    name: MIT
  x-logo:
    url: https://redocly.github.io/redoc/petstore-logo.png
    href: http://localhost:1234
    altText: The logo
servers:
  - url: http://petstore.swagger.io/v1
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      tags:
        - pets
      parameters:
        - name: limit
          in: query
          description: How many items to return at one time (max 100)
          required: false
          schema:
            type: integer
            format: int32
      responses:
        200:
          description: An paged array of pets
          headers:
            x-next:
              description: A link to the next page of responses
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pets'
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
    post:
      summary: Create a pet
      operationId: createPets
      tags:
        - pets
      responses:
        201:
          description: Null response
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
  /pets/{petId}:
    get:
      summary: Info for a specific pet
      operationId: showPetById
      tags:
        - pets
      parameters:
        - name: petId
          in: path
          required: true
          description: The id of the pet to retrieve
          schema:
            type: string
      responses:
        200:
          description: Expected response to a valid request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pets'
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
components:
  schemas:
    Pet:
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string
        tag:
          type: string
    Pets:
      type: array
      items:
        $ref: '#/components/schemas/Pet'
    Error:
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
`;

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
        Info({ add, block, get }) {
          add(
            block('Paragraph', '/x-logo', {
              text: `[![${get('/x-logo/altText')}](${get(
                '/x-logo/url'
              )})](${get('/x-logo/href')})`,
            })
          );
        },
      },
    },
  ],
};

const App = () => {
  const [document, setDocument] = React.useState<IApiDocument | null>(null);

  React.useEffect(() => {
    convert(data, options).then(setDocument);
  }, []);

  return <div>{document ? <ApiDocument document={document} /> : null}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
