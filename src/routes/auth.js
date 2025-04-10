import express from "express";
import { login, validarToken } from "../controllers/auth/index.js";
import { createFirstUser } from "../controllers/auth/create-first-user.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/validar-token", validarToken);
authRouter.post("/create-first-user", createFirstUser);

export { authRouter };
