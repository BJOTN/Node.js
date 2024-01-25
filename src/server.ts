import express from "express";
import morgan from "morgan";
import "express-async-errors";

import { login, logout, signUp } from "./controller/user";
import { db, setUpDb } from "./db";
import { authorize } from "./authorize";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.post('/api/users/signup', signUp);
app.post('/api/users/login', login);
app.get('/api/users/logout', authorize, logout);

setUpDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
