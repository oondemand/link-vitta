import express from "express";
import { create } from "../controllers/base-omie/create.js";
import { update } from "../controllers/base-omie/update.js";
import { deleteBase } from "../controllers/base-omie/delete.js";
import { listAll } from "../controllers/base-omie/list-all.js";

const baseOmieRouter = express.Router();

baseOmieRouter.post("/create", create);
baseOmieRouter.put("/update/:id", update);
baseOmieRouter.delete("/delete/:id", deleteBase);
baseOmieRouter.get("/list-all", listAll);

export { baseOmieRouter };
