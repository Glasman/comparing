import { client } from "./client.js";

const createTag = async (name) => {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
             INSERT INTO tags (name) 
             VALUES ($1)
             RETURNING *;
              `,
      [name]
    );
    return tag;
  } catch (error) {
    console.log(error);
  }
};

export { createTag };
