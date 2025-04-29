import { client } from "./client.js";

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS users;
            `);
  } catch (error) {
    console.log(error);
  }
};

const createTables = async () => {
  try {
    await client.query(`
        CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(30),
         password VARCHAR(30)
        );

        CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT,
        user_id INTEGER REFERENCES users(id) NOT NULL
        );
        `);
  } catch (e) {
    console.log(e);
  }
};

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");
    await dropTables();
    console.log("Tables dropped");
    await createTables();
    console.log("Tables created");
    client.end();
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();
