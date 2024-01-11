import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");

/* SetUp db */
const setUpDb = async () => {
  await db.none(`
  DROP TABLE IF EXIST planets
  CREATE TABLE plantes(
    ID SERIAL NOT NULL PRIMARY KEY
    NAME TEXT NOT NULL
  )`);
  await db.none(`INSERT INTO planets(none)
  VALUE('Earth')`);
};

const getAll = async(req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOnebyID = async (req: Request, res: Response) => {
  const planetID = Number(req.params.id);
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(planetID));
  if (!planet) {
    return res.status(404).json({ error: "Planet dont exist" });
  }
  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };

  /* planets.push(newPlanet); */

  res.status(201).json({ msg: "planet created" });
};

const updatebyID = (req: Request, res: Response) => {
  const planetId = Number(req.params.id);
  const { name } = req.body;
/*   planets = planets.map((p) => (p.id === planetId ? { ...p, name } : p));
 */  res.status(200).json({ msg: "planet modified" });
};

const delatebyID = (req: Request, res: Response) => {
  const planetID = Number(req.params.id);
/*   planets = planets.filter((p) => p.id !== planetID);
 */  res.status(200).json({ msg: "planet delated" });
};

export { getAll, create, delatebyID, updatebyID, getOnebyID };
