import { client } from "./client.js";

const createItem = async (name, image_url, description, item_id) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
             INSERT INTO items (name, image_url, description, item_id) 
             VALUES ($1, $2, $3, $4)
             RETURNING *
              `,
      [name, image_url, description, item_id]
    );
    return item;
  } catch (error) {
    console.log(error);
  }
};

export { createItem };
