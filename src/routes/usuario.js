import express from "express";
import { create } from "../controllers/usuario/create.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/create", create);

export { usuarioRouter };
