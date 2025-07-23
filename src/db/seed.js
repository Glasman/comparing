import { client } from "./client.js";
import { createUser } from "./users.js";
import { createItem, createManyItems } from "./items.js";
import { createTag } from "./tags.js";
import { addTagToItem } from "./item_tag.js";
import bcrypt from "bcryptjs";

const dropTables = async () => {
  try {
    await client.query(`
            DROP TABLE IF EXISTS item_tags;
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS users;
            `);
  } catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
  try {
    //note; category is for object groups, i.e. Rice or Pickup Trucks
    await client.query(`
        CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(30) NOT NULL,
         password TEXT NOT NULL,
         is_admin boolean DEFAULT FALSE
        );

        CREATE UNIQUE INDEX IF NOT EXISTS unique_lower_username ON users (LOWER(username));

        CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        admin_approved BOOLEAN DEFAULT FALSE,
        category_description TEXT NOT NULL
        );

        CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE item_tags (
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (item_id, tag_id)
        )
        `);
  } catch (error) {
    console.error(error);
  }
};

const syncAndSeed = async () => {
  try {
    // await client.connect();
    // moved this to client.js
    console.log("Connected to DB");
    await dropTables();
    console.log("Tables dropped");
    await createTables();
    console.log("Tables created");
    const brickPass = await bcrypt.hash(`red`, 5);
    const grassPass = await bcrypt.hash(`green`, 5);
    const sunnyPass = await bcrypt.hash(`yellow`, 5);
    const markPass = await bcrypt.hash(`password`, 5);
    await createUser("Brick", brickPass);
    await createUser("Grass", grassPass);
    await createUser("Sunny", sunnyPass);
    const mark = await createUser("Mark", markPass, true);
    console.log("Users created");
    const whiteRice = await createItem(
      "White rice",
      "https://i.imgur.com/hoLtPSV.jpeg",
      "Plain ol white rice",
      "Rice",
      mark.id,
      false,
      "A staple grain that is popular in many cultures and has many different forms."
    );
    await createItem(
      "Brown rice",
      "https://i.imgur.com/3f5TX4s.png",
      "Nutrient rich brown rice",
      "Rice",
      mark.id,
      true,
      "A staple grain that is popular in many cultures and has many different forms."
    );
    await createItem(
      "Long grain rice",
      "https://plus.unsplash.com/premium_photo-1723925093264-40b6b957c44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZyUyMGdyYWluJTIwcmljZXxlbnwwfHwwfHx8MA%3D%3D",
      "Rice with long grains",
      "Rice",
      mark.id,
      true,
      "A staple grain that is popular in many cultures and has many different forms."
    );
    await createItem(
      "Medium grain rice",
      "https://cdn.apartmenttherapy.info/image/upload/v1617654647/k/Photo/Series/2021-03-rice-o-pedia/Medium-Grain-Rice/2021-03-30_ATK-48191-Rice-Medium-Grain.jpg",
      "Rice with medium grains",
      "Rice",
      mark.id,
      true,
      "A staple grain that is popular in many cultures and has many different forms."
    );
    await createItem(
      "Short grain rice",
      "https://www.zojirushi.com/blog/wp-content/uploads/2016/01/gohan.jpg",
      "Rice with short grains",
      "Rice",
      mark.id,
      true,
      "A staple grain that is popular in many cultures and has many different forms."
    );
    await createItem(
      "Cotton",
      "https://i.imgur.com/hPXT4Dz.jpeg",
      "A material from the cotton plant. Warm but can be expensive, and can get cold when wet.",
      "Clothing material",
      mark.id,
      true,
      "A material that is used for, among other things, making clothing."
    );
    await createItem(
      "Wool",
      "https://i.imgur.com/OZrNJUw.jpeg",
      "Wool sheared from sheep. Stays warm when wet but can be expensive due to it's slower rate of growth.",
      "Clothing material",
      mark.id,
      true,
      "A material that is used for, among other things, making clothing."
    );
    await createItem(
      "Synthetic material",
      "https://extrabutterny.com/cdn/shop/files/FN7668-060-1_95a82a4b-caef-47ff-9169-98a2cf78a027.jpg?v=1718384369",
      "Materials like nylon, cheap but tear easily and are not as good for keeping warm as cotton or wool.",
      "Clothing material",
      mark.id,
      true,
      "A material that is used for, among other things, making clothing."
    );
    await createItem(
      "Coupe",
      "https://i.imgur.com/k8K1atk.jpeg",
      "A coupe is just a car with 2 doors. It could be done to make it faster in sporty cars or cheaper to be made more affordable.",
      "Vehicle",
      mark.id,
      true,
      "A motorized vehicle, often powered by gasoline, which can be used to transport people and goods."
    );
    await createItem(
      "Sedan",
      "https://i.imgur.com/aaGLE2ug.jpg",
      "A sedan is a car with 4 doors to allow for easier access to the back seat for families and so on.",
      "Vehicle",
      mark.id,
      true,
      "A motorized vehicle, often powered by gasoline, which can be used to transport people and goods."
    );
    await createItem(
      "Pickup Truck",
      "https://i.imgur.com/pSx08Nj.jpeg",
      "A pickup truck has a big bed in the back for hauling, although they can be gas guzzlers sometimes.",
      "Vehicle",
      mark.id,
      true,
      "A motorized vehicle, often powered by gasoline, which can be used to transport people and goods."
    );

    await createManyItems([
      {
        name: "Cats",
        imageURL:
          "/images/pepper.jpeg",
          description: 'Cats are considered by many to be a great low maintenance pet. They can keeo to themselves sometimes but if they learn to trust you they can show you lots of love in their own unique way.',
          category: 'Pets',
          categoryDescription: "Pets are animals that humans keep for companionship, as well help around the house or homestead."
      },
      {
        name: "Dogs",
        imageURL: "/images/dogs.webp",
          description: 'Dogs are loyal companions and of of the oldest domesticated animals. Sometimes used for work such as herding, or just for companionship, dogs are considered a favorite pet by many.',
          category: 'Pets',
          categoryDescription: "Pets are animals that humans keep for companionship, as well help around the house or homestead."
      },
      {
        name: "Birds",
        imageURL: "https://i.imgur.com/xg2OJ7n.jpeg",
          description: 'Birds are very unique animals kept by pets as many around the globe. They can be very intelligent and have very unique, yet fascinating, interpersonal lives. Fun fact-birds are the closest living relative to dinosaurs!',
          category: 'Pets',
          categoryDescription: "Pets are animals that humans keep for companionship, as well help around the house or homestead."
      }
    ], 4);
    console.log("Items created");
    const food = await createTag("Food");
    await createTag("Cars");
    await addTagToItem(whiteRice.id, food.id);
    client.end();
  } catch (error) {
    console.error(error);
  }
};

syncAndSeed();
