import { client } from "./client.js";
import { createUser } from "./users.js";
import { createItem } from "./items.js";

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS item_tags;
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS tags;
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
         username VARCHAR(30) NOT NULL,
         password VARCHAR(30) NOT NULL
        );

        CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        item_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
        );

        CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE item_tags (
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (item_id, tag_id)
        )
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
    const brick = await createUser("Brick", "Red");
    const grass = await createUser("Grass", "Green");
    await createUser("Sunny", "Yellow");
    console.log("Users created");
    await createItem(
      "White rice",
      "https://i.imgur.com/hoLtPSV.jpeg",
      "Plain ol white rice",
      brick.id
    );
    await createItem(
      "Brown rice",
      "https://i.imgur.com/3f5TX4s.png",
      "Nutrient rich brown rice",
      grass.id
    );
    console.log("Items created");
    client.end();
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();
