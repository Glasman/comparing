import { client } from "./client.js";

const createUser = async (name, password, isAdmin = false) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
           INSERT INTO users (username, password, isAdmin) 
           VALUES ($1, $2, $3)
           RETURNING *;
            `,
      [name, password, isAdmin]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
           SELECT * FROM users;
            `);
    return rows;
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

export { createUser, getUser, getAllUsers };
