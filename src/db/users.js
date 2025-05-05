import { client } from "./client.js";

const createUser = async (name, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
           INSERT INTO users (username, password) 
           VALUES ($1, $2)
           RETURNING *;
            `,
      [name, password]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (username, password) => {
  try {
    const user = await client.query(`
           SELECT * FROM users
           WHERE username='${username}' AND password='${password}
            `);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getUser };
