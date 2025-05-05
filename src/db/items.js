import { client } from "./client.js";

const createItem = async (name, image_url, description, user_id) => {
  try {
    await client.query(
      `
             INSERT INTO items (name, image_url, description, user_id) 
             VALUES ($1, $2, $3, $4)
             RETURNING *
              `,
      [name, image_url, description, user_id]
    );
  } catch (error) {
    console.log(error);
  }
};

export { createItem };
