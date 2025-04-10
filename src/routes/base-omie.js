import express from "express";
import { create } from "../controllers/base-omie/create.js";

const baseOmieRouter = express.Router();

baseOmieRouter.post("/create", create);

export { baseOmieRouter };
