const replace = require('replace-in-file');

const URL = 'http://localhost:3000';
const options = {
  files: './fetch/index.ts',
  from: [new RegExp('URL = (.?)*')],
  to: [`URL = '${URL}';`],
};
replace.sync(options);
process.exit(0);
