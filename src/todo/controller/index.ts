import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { TodoInstance } from "../model";

class TodoController {
  async createHandler(req: Request, res: Response) {
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

  async readHandler(req: Request, res: Response) {
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

  async readByIdHandler(req: Request, res: Response) {
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

  async updateHandler(req: Request, res: Response) {
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
  async deleteHandler(req: Request, res: Response) {
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
}

export default new TodoController();
