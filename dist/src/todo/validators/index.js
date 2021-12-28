"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TodoValidator {
    checkCreateTodo() {
        return [
            (0, express_validator_1.body)("id")
                .optional()
                .isUUID(4)
                .withMessage("The value should be UUID v4"),
            (0, express_validator_1.body)("title").notEmpty().withMessage("The title should not be empty"),
            (0, express_validator_1.body)("completed")
                .optional()
                .isBoolean()
                .withMessage("The value should be a boolean")
                .isIn([0, false])
                .withMessage("The value should be 0 or false"),
        ];
    }
    checkReadTodo() {
        return [
            (0, express_validator_1.query)("limit")
                .notEmpty()
                .withMessage("The limit should not be empty")
                .isInt({ min: 1, max: 10 })
                .withMessage("The limit should be numbers between 1 and 10"),
            (0, express_validator_1.query)("offset")
                .optional()
                .isNumeric()
                .withMessage("The offset should be a number"),
        ];
    }
    checkIdParams() {
        return [
            (0, express_validator_1.param)("id")
                .notEmpty()
                .withMessage("The id should not be empty")
                .isUUID(4)
                .withMessage("The value should be UUID v4"),
        ];
    }
}
exports.default = new TodoValidator();
