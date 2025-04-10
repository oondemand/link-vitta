import express from "express";
import { create } from "../controllers/template/create.js";
import { update } from "../controllers/template/update.js";
import { deleteTemplate } from "../controllers/template/delete.js";
import { listAll } from "../controllers/template/list-all.js";

const templateRouter = express.Router();

templateRouter.post("/create", create);
templateRouter.put("/update/:id", update);
templateRouter.delete("/delete/:id", deleteTemplate);
templateRouter.get("/list-all", listAll);

export { templateRouter };
