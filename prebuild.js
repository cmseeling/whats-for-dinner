require('dotenv').config();
const fs = require('fs');

console.log('Prebuild started. Gathering environment variables.');

const clientOptions = {
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_SECRET
};

if (process.env.ENDPOINT) {
  clientOptions.endpoint = process.env.ENDPOINT;
}

fs.writeFileSync('./src/lambdas/dynamodb/config.ts', `export const clientOptions = ${JSON.stringify(clientOptions)};`);

if (process.env.CREATE_TABLE) {
  fs.appendFileSync('./src/lambdas/dynamodb/config.ts', `\nexport const CreateTable = true;`);
} else {
  fs.appendFileSync('./src/lambdas/dynamodb/config.ts', `\nexport const CreateTable = false;`);
}
