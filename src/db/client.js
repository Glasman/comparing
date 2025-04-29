import pkg from 'pg';
const { Client } = pkg;

const client = new Client('postgres://localhost:5432/comparingthings')


export { client };