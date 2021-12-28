import express from "express";

import TodoController from "../controller";
import TodoValidator from "../validators";
import Middleware from "../../middleware";

const router = express.Router();

router.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationErros,
  TodoController.createHandler
);

router.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationErros,
  TodoController.readHandler
);

router.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.readByIdHandler
);

router.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.updateHandler
);

router.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  Middleware.handleValidationErros,
  TodoController.deleteHandler
);

export default router;
