import { client } from "./client.js";

const createItem = async (name, image_url, description, item_id) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
             INSERT INTO items (name, image_url, description, user_id) 
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

const getAllItems = async () => {
  try {
    const { rows } = await client.query(`
             SELECT * FROM items;
              `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getItemByID = async (id) => {
  try {
    const {
      rows: [item],
    } = await client.query(`
               SELECT * FROM items
               WHERE id='${id}' 
                `);
    return item;
  } catch (error) {
    console.log(error);
  }
};

export { createItem, getAllItems, getItemByID };
