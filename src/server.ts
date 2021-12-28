import express, { Request, Response } from "express";

import db from "./config/database.config";
import todoRouter from "./routes";

const app = express();
const port = 9000;

app.use(express.json());

db.sync().then(() => {
  console.log("DB Connected");
});

app.get("/healthcheck", (req: Request, res: Response) => {
  return res.send("server is running.. 🏃‍♂️");
});

app.use("/api/v1", todoRouter);

app.listen(port, () => console.log(`listening on localhost:${port}`));
