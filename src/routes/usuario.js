import express from "express";
import { create } from "../controllers/usuario/create.js";
import { update } from "../controllers/usuario/update.js";
import { deleteUser } from "../controllers/usuario/delete.js";
import { listAll } from "../controllers/usuario/list-all.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/create", create);
usuarioRouter.put("/update/:id", update);
usuarioRouter.delete("/delete/:id", deleteUser);
usuarioRouter.get("/list-all", listAll);

export { usuarioRouter };
