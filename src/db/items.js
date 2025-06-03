import { client } from "./client.js";

const createItem = async (
  name,
  image_url,
  description,
  category,
  item_id,
  admin_approved = false
) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
             INSERT INTO items (name, image_url, description, category, user_id, admin_approved) 
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *
              `,
      [name, image_url, description, category, item_id, admin_approved]
    );
    return item;
  } catch (error) {
    console.log(error);
  }
};

const getAllItems = async () => {
  try {
    const { rows } = await client.query(`
             SELECT * FROM items
              `);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const getApprovedItems = async () => {
  try {
    const { rows } = await client.query(`
             SELECT * FROM items
             WHERE admin_approved = TRUE;
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

export { createItem, getAllItems, getApprovedItems, getItemByID };
