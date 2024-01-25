import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:omc700xn5@localhost:5432/planets");

/* SetUp db */
const setUpDb = async () => {
  try {
    console.log("Dropping and creating table...");
    await db.none(`
      DROP TABLE IF EXISTS planets;
      CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
      );
      DROP TABLE IF EXISTS users(
        id SERIAL NOT NULL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT
      );
    `);

    console.log("Inserting data into the table...");
    await db.none(`INSERT INTO planets(name) VALUES('Earth')`);
    await db.none(`INSERT INTO planets(name) VALUES('Mars')`);
    await db.none(`INSERT INTO users(username,passwrod) VALUES('username','password')`)
    console.log("Database setup successful!");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};
setUpDb();
export {db, setUpDb}