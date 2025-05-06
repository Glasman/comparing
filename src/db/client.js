import pkg from 'pg';
const { Client } = pkg;

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/comparingthings')

await client.connect();

export { client };