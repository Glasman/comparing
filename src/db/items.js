import { client } from "./client.js";

const getAllItems = async () => {
  try {
    const { rows } = await client.query(`
             SELECT * FROM items
              `);
    return rows;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};
const getUnapprovedItems = async () => {
  try {
    const { rows } = await client.query(`
             SELECT * FROM items
             WHERE admin_approved = FALSE;
              `);

    return rows;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

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
    console.error(error);
  }
};

const createManyItems = async (items, user_id) => {
  try {
    if (!items.length) return [];

    const values = [];
    const params = [];

    items.forEach((item, index) => {
      const offset = index * 6;
      values.push(
        `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${
          offset + 5
        }, $${offset + 6})`
      );
      params.push(
        item.name,
        item.imageURL,
        item.description,
        item.category,
        user_id,
        false
      );
    });

    const query = `
    INSERT INTO items (name, image_url, description, category, user_id, admin_approved)
    VALUES ${values.join(", ")}
    RETURNING *
    `;

    const { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

export {
  createItem,
  createManyItems,
  getAllItems,
  getApprovedItems,
  getItemByID,
  getUnapprovedItems
};
