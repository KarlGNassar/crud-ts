"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller"));
const validators_1 = __importDefault(require("../validators"));
const middleware_1 = __importDefault(require("../../middleware"));
const router = express_1.default.Router();
router.post("/create", validators_1.default.checkCreateTodo(), middleware_1.default.handleValidationErros, controller_1.default.createHandler);
router.get("/read", validators_1.default.checkReadTodo(), middleware_1.default.handleValidationErros, controller_1.default.readHandler);
router.get("/read/:id", validators_1.default.checkIdParams(), middleware_1.default.handleValidationErros, controller_1.default.readByIdHandler);
router.put("/update/:id", validators_1.default.checkIdParams(), middleware_1.default.handleValidationErros, controller_1.default.updateHandler);
router.delete("/delete/:id", validators_1.default.checkIdParams(), middleware_1.default.handleValidationErros, controller_1.default.deleteHandler);
exports.default = router;
