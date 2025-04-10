import express from "express";
import { login, validarToken } from "../controllers/auth/index.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/validar-token", validarToken);

export { authRouter };
