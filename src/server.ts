import express, { Request, Response } from "express";

import db from "./config/database.config";

const app = express();
const port = 9000;

db.sync().then(() => {
  console.log("DB Connected");
});

app.get("/", (req: Request, res: Response) => {
  return res.send("server is running.. 🏃‍♂️");
});

app.listen(port, () => console.log(`listening on localhost:${port}`));
