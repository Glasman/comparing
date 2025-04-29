import { client } from "./client.js";

const createUser = async (name, password) => {
  try {
    await client.query(`
           INSERT INTO users (username, password) 
           VALUES ('${name}', '${password}')
            `);
  } catch (error) {
    console.log(error);
  }
};


export { createUser };
