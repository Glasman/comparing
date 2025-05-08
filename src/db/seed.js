import { client } from "./client.js";
import { createUser } from "./users.js";
import { createItem } from "./items.js";
import { createTag } from "./tags.js";
import { addTagToItem } from "./item_tag.js";
import bcrypt from "bcryptjs";

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
         password TEXT NOT NULL,
         isAdmin boolean DEFAULT FALSE
        );

        CREATE UNIQUE INDEX IF NOT EXISTS unique_lower_username ON users (LOWER(username));

        CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
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
    // await client.connect();
    // moved this to client.js
    console.log("Connected to DB");
    await dropTables();
    console.log("Tables dropped");
    await createTables();
    console.log("Tables created");
    const brickPass = await bcrypt.hash(`red`, 5)
    const grassPass = await bcrypt.hash(`green`, 5)
    const sunnyPass = await bcrypt.hash(`yellow`, 5)
    const markPass = await bcrypt.hash(`password`, 5)
    await createUser("Brick", brickPass);
    await createUser("Grass", grassPass);
    await createUser("Sunny", sunnyPass);
    const mark = await createUser("Mark", markPass, true);
    console.log("Users created");
    const whiteRice = await createItem(
      "White rice",
      "https://i.imgur.com/hoLtPSV.jpeg",
      "Plain ol white rice",
      mark.id
    );
    await createItem(
      "Brown rice",
      "https://i.imgur.com/3f5TX4s.png",
      "Nutrient rich brown rice",
      mark.id
    );
    console.log("Items created");
    const food = await createTag("Food");
    await createTag("Cars");
    await addTagToItem(whiteRice.id, food.id);
    client.end();
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();
