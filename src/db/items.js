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
  admin_approved = false,
  category_description
) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
             INSERT INTO items (name, image_url, description, category, user_id, admin_approved, category_description) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *
              `,
      [
        name,
        image_url,
        description,
        category,
        item_id,
        admin_approved,
        category_description,
      ]
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
      const offset = index * 7;
      values.push(
        `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${
          offset + 5
        }, $${offset + 6}, $${offset + 7})`
      );

      params.push(
        item.name,
        item.imageURL,
        item.description,
        item.category,
        user_id,
        false,
        // item.category_description
        item.categoryDescription
      );
    });

    //values.join is just a long string of numbers (e.g. ($1, $2, etc)) and
    //is safe from injection attacks
    const query = `
    INSERT INTO items (name, image_url, description, category, user_id, admin_approved, category_description)
    VALUES ${values.join(", ")}
    RETURNING *
    `;

    const { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const getItemByCategory = async (category) => {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM ITEMS
      WHERE LOWER(category) = LOWER($1)
      `,
      [category]
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
};

const approveItemById = async (id) => {
  try {
    const { rows } = await client.query(
      `UPDATE items
      SET admin_approved = true
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

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
  getUnapprovedItems,
  getItemByCategory,
  approveItemById,
};
