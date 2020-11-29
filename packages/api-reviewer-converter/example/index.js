const { convert } = require('../dist');
const fs = require('fs-jetpack');

const data = fs.read('petstore.yaml');

async function main() {
  const document = await convert(data);
  console.dir(document.blocks, { depth: null });
  // console.dir(
  //   Object.fromEntries(
  //     Array.from(document.pointerMap.entries()).filter(([_, v]) => true)
  //   ),
  //   { depth: null }
  // );
}

main();
