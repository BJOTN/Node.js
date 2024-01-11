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
    `);

    console.log("Inserting data into the table...");
    await db.none(`INSERT INTO planets(name) VALUES('Earth')`);
    await db.none(`INSERT INTO planets(name) VALUES('Mars')`);
    console.log("Database setup successful!");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const planets = await db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
  } catch (error) {
    console.error("Error fetching planets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOnebyID = async (req: Request, res: Response) => {
  try {
    const planetID = Number(req.params.id);
    const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, planetID);
    res.status(200).json(planet);
  } catch (error) {
    console.error("Error fetching planet by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  await db.none(`INSERT INTO planets (name) VALUES ($1);`, name);
  res.status(201).json({ msg: "planet created" });
};

const updatebyID = (req: Request, res: Response) => {
  const planetId = Number(req.params.id);
  const { name } = req.body;

  db.none(`UPDATE planets SET name=$2 WHERE id=$1;`, [planetId, name]);

  res.status(200).json({ msg: "planet modified" });
};

const delatebyID = (req: Request, res: Response) => {
  const planetID = Number(req.params.id);

  db.none(`DELETE FROM planets WHERE id=$1;`, planetID);

  res.status(200).json({ msg: "planet deleted" });
};

export { getAll, create, delatebyID, updatebyID, getOnebyID, setUpDb};
