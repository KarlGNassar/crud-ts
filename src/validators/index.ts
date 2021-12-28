import { body, query } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value should be UUID v4"),
      body("title").notEmpty().withMessage("The title should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("The value should be a boolean")
        .isIn([0, false])
        .withMessage("The value should be 0 or false"),
    ];
  }

  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("The limit should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("The limit should be numbers between 1 and 10"),
      query("offset")
        .optional()
        .isNumeric()
        .withMessage("The offset should be a number"),
    ];
  }
}

export default new TodoValidator();
