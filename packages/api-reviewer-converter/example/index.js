const { convert } = require('../dist');
const fs = require('fs-jetpack');

const data = fs.read('petstore.yaml');

async function main() {
  const document = await convert(data, {
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
              block('Markdown', '/x-logo', {
                text: `[![${get('/x-logo/altText')}](${get(
                  '/x-logo/url'
                )})](${get('/x-logo/href')})`,
              })
            );
          },
        },
      },
    ],
  });
  console.dir(document.blocks, { depth: null });
  // console.dir(
  //   Object.fromEntries(
  //     Array.from(document.pointerMap.entries()).filter(([_, v]) => true)
  //   ),
  //   { depth: null }
  // );
}

main();
