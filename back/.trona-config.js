const { Client } = require('pg');
const { readFileSync } = require('fs');
const { join } = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const getSslConfig =
  process.env.NODE_ENV !== 'production'
    ? () => undefined
    : () => ({
        ca: readFileSync(
          join(__dirname, '..', '.secure', 'ca-certificate.txt'),
        ),
      });

const client = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  ssl: getSslConfig(),
});

client.connect().then(() => {
  console.log(`Connected to ${process.env.DB_NAME}`);
});

module.exports = {
  evolutionsFolderPath: ['evolutions'],
  runQuery(query) {
    return client.query(query).then(result => result.rows);
  },
};
