import express from "express";
import { env } from "../config/env.js";

const statusRoutes = express.Router();

statusRoutes.get("/", async (req, res) => {
  res.json({ status: "🟢 OK", message: env.SERVICE_VERSION });
});

export { statusRoutes };
