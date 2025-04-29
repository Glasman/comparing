import { client } from "./client.js";

const createUser = async () => {
  try {
    await client.query(`
           INSERT INTO users (username, password) 
           VALUES ('Moe', 'Moe')
            `);
  } catch (error) {
    console.log(error);
  }
};


export { createUser };
