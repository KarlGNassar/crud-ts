import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import db from "./config/database.config";
import { TodoInstance } from "./model";

const app = express();
const port = 9000;

app.use(express.json());

db.sync().then(() => {
  console.log("DB Connected");
});

app.get("/healthcheck", (req: Request, res: Response) => {
  return res.send("server is running.. 🏃‍♂️");
});

app.post("/create", async (req: Request, res: Response) => {
  const id = uuidv4();
  try {
    const record = await TodoInstance.create({ ...req.body, id });
    return res.json({ record, msg: "Successfully created todo" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to create", status: 500, route: "/create" });
  }
});

app.listen(port, () => console.log(`listening on localhost:${port}`));
