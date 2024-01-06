import { Request, Response } from "express";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

const getOnebyID = (req: Request, res: Response) => {
  const planetID = Number(req.params.id);
  const planet = planets.find((p) => p.id === planetID);
  if (!planet) {
    return res.status(404).json({ error: "Planet dont exist" });
  }
  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };

  planets.push(newPlanet);

  res.status(201).json({ msg: "planet created" });
};

const updatebyID = (req: Request, res: Response) => {
  const planetId = Number(req.params.id);
  const { name } = req.body;
  planets = planets.map((p) => (p.id === planetId ? { ...p, name } : p));
  res.status(200).json({ msg: "planet modified" });
};

const delatebyID = (req: Request, res: Response) => {
  const planetID = Number(req.params.id);
  planets = planets.filter((p) => p.id !== planetID);
  res.status(200).json({ msg: "planet delated" });
};

export { getAll, create, delatebyID, updatebyID , getOnebyID};
