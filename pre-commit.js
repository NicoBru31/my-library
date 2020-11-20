const replace = require('replace-in-file');

const URL = 'https://my-library-fe53bsjce.vercel.app';
const options = {
  files: './fetch/index.ts',
  from: [new RegExp('URL = (.?)*')],
  to: [`URL = '${URL}';`],
};
replace.sync(options);
process.exit(0);
