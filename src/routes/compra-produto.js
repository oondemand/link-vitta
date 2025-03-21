import express from "express";
import { etapaAlterada } from "../controllers/compra-produto/etapa-alterada.js";

const compraProdutoRoutes = express.Router();

compraProdutoRoutes.get("/etapa-alterada", etapaAlterada);

export { compraProdutoRoutes };
