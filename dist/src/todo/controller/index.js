"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
class TodoController {
    createHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield model_1.TodoInstance.create(Object.assign(Object.assign({}, req.body), { id }));
                return res.json({ record, msg: "Successfully created todo" });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ msg: "Failed to create", status: 500, route: "/create" });
            }
        });
    }
    readHandler(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
                const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
                const records = yield model_1.TodoInstance.findAll({ where: {}, limit, offset });
                return res.json(records);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ msg: "Failed to read", status: 500, route: "/read" });
            }
        });
    }
    readByIdHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.TodoInstance.findOne({ where: { id } });
                return res.json(record);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ msg: "Failed to read", status: 500, route: "/read/:id" });
            }
        });
    }
    updateHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.TodoInstance.findOne({ where: { id } });
                if (!record)
                    return res.json({ msg: "Cannot find existing todo" });
                const updatedRecord = yield record.update({
                    completed: !record.getDataValue("completed"),
                });
                return res.json({ record: updatedRecord });
            }
            catch (error) {
                return res.json({
                    msg: "Fail to update",
                    status: 500,
                    route: "/update/:id",
                });
            }
        });
    }
    deleteHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield model_1.TodoInstance.findOne({ where: { id } });
                if (!record)
                    return res.json({ msg: "Cannot find existing todo" });
                const deletedRecord = yield record.destroy();
                return res.json({ record: deletedRecord });
            }
            catch (error) {
                return res.json({
                    msg: "Fail to update",
                    status: 500,
                    route: "/delete/:id",
                });
            }
        });
    }
}
exports.default = new TodoController();
