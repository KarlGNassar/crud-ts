import express, { NextFunction, Request, Response } from "express";

import db from "./config/database.config";
import TodoController from "./controller";
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
  TodoController.createHandler
);

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationErros,
  TodoController.readHandler
);

app.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.readByIdHandler
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.updateHandler
);

app.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.deleteHandler
);

app.listen(port, () => console.log(`listening on localhost:${port}`));
