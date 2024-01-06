import express from "express";
import morgan from "morgan";
import "express-async-errors";

const app = express();
const port = 3000;

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

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});


app.get("/api/planets/:id", (req, res) => {
  const planetID = Number(req.params.id);
  const planet = planets.find((p) => p.id === planetID);
  if (!planet) {
    return res.status(404).json({ error: "Planet dont exist" });
  }
  res.status(200).json(planet);
});


app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };

  planets.push(newPlanet);

  res.status(201).json({ msg: "planet created" });
});


app.put("/api/planets/:id", (req, res) =>{
  const planetId = Number(req.params.id);
  const {name}= req.body;
  planets = planets.map(p=> p.id === planetId ? ({...p,name}):p)
  res.status(200).json({msg:'planet modified'})
});

app.delete('/api/planets/:id',(req, res)=>{
  const planetID = Number(req.params.id);
  planets = planets.filter(p=>p.id !== planetID)
  res.status(200).json({ msg: "planet delated" });
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
