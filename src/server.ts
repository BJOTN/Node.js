import express from "express";
import morgan from "morgan";
import "express-async-errors";
import { getAll, getOnebyID ,create, delatebyID, updatebyID, setUpDb, updateImageById , upload} from "./controller/planets";
import multer from "multer";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets",getAll);

app.get("/api/planets/:id",getOnebyID);

app.post("/api/planets",create);
app.post("/api/planets/:id/image", upload.single("image"), updateImageById);


app.put("/api/planets/:id",updatebyID);

app.delete("/api/planets/:id",delatebyID);


setUpDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
