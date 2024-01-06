import express from "express";
import morgan from "morgan";
import 'express-async-errors'

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


app.use(morgan('dev'))

app.get("/planets", (req, res) => {
  res.status(200).json(planets)
});

app.listen(port,()=>{
  console.log(`http://localhost:${port}`)
})