import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import db from "./config/database.config";
import { TodoInstance } from "./model";
import TodoValidator from "./validators";
import Middleware from "./middleware";

const app = express();
const port = 9000;

app.use(express.json());

db.sync().then(() => {
  console.log("DB Connected");
});

app.get("/healthcheck", (req: Request, res: Response) => {
  return res.send("server is running.. 🏃‍♂️");
});

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationErros,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully created todo" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Failed to create", status: 500, route: "/create" });
    }
  }
);

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationErros,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(records);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Failed to read", status: 500, route: "/read" });
    }
  }
);

app.listen(port, () => console.log(`listening on localhost:${port}`));
