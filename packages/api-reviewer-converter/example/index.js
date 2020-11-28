const { convert } = require('../dist');
const fs = require('fs-jetpack');

const data = fs.read('petstore.yaml');

const document = convert(data);

console.dir(document, { dpeth: null });
