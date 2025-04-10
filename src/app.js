import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import path from "node:path";

import { statusRoutes } from "./routes/status.js";
import { compraProdutoRoutes } from "./routes/compra-produto.js";
import { fileURLToPath } from "url";

import { z } from "zod";
import { authRouter } from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
if (env.NODE_ENV === "dev") app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", statusRoutes);
app.use("/", authRouter);
app.use("/compra-produto", compraProdutoRoutes);

app.use((error, req, res, next) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ errors: error.errors });
  }

  return res
    .status(500)
    .send("Um erro inesperado aconteceu! Tente novamente mais tarde!");
});

export { app };
