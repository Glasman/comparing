import { client } from "./client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

const getUserByID = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
             SELECT * FROM users
             WHERE id='${id}' 
              `);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT * FROM users WHERE LOWER(username) = LOWER($1)`,
      [username]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (username, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT * FROM users
        WHERE LOWER(username) = LOWER($1)`,
      [username]
    );

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (user && comparedPassword) {
      const assignedToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET
      );
      return assignedToken;
    } else {
      const error = new Error("Bad credentials");
      error.status = 401;
      throw error;
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};

export { createUser, getUser, getAllUsers, getUserByID, getUserByUsername };
