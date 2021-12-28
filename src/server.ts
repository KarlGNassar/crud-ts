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

app.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Failed to read", status: 500, route: "/read/:id" });
    }
  }
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) return res.json({ msg: "Cannot find existing todo" });

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });
      return res.json({ record: updatedRecord });
    } catch (error) {
      return res.json({
        msg: "Fail to update",
        status: 500,
        route: "/update/:id",
      });
    }
  }
);

app.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) return res.json({ msg: "Cannot find existing todo" });

      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (error) {
      return res.json({
        msg: "Fail to update",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
);

app.listen(port, () => console.log(`listening on localhost:${port}`));
