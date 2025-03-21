import express from "express";
import { etapaAlterada } from "../controllers/compra-produto/etapa-alterada.js";

const compraProdutoRoutes = express.Router();

compraProdutoRoutes.post("/etapa-alterada", etapaAlterada);

export { compraProdutoRoutes };
