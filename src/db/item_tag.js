import { client } from "./client.js";

const addTagToItem = async (itemId, tagId) => {
  try {
    const {
      rows: [itemTag],
    } = await client.query(
      `
        INSERT INTO item_tags (item_id, tag_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING *;
        `,
        [itemId, tagId]
    );
  } catch (error) {
    console.log(error);
  }
};

export { addTagToItem };
