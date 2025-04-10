import { BaseOmie } from "../models/base-omie.js";

export const authenticateBySecretKey = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};
