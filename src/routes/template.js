import express from "express";
import { create } from "../controllers/template/create";
import { update } from "../controllers/template/update";
import { deleteTemplate } from "../controllers/template/delete";
import { listAll } from "../controllers/template/list-all";

const templateRouter = express.Router();

templateRouter.post("/create", create);
templateRouter.put("/update/:id", update);
templateRouter.delete("/delete/:id", deleteTemplate);
templateRouter.get("/list-all", listAll);

export { templateRouter };
