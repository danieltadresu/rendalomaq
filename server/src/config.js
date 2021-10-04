const dotenv = require('dotenv');


const envDir = './src/environments';
const envFile = `.env.${process.env.ENVIRONMENT || 'development'}`;
const envPath = `${envDir}/${envFile}`

dotenv.config({ path: envPath});
