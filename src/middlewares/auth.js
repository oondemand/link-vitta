import { BaseOmie } from "../models/base-omie.js";

export const authenticateBySecretKey = async (req, res, next) => {
  try {
    // const secretKey = req.headers.secretkey || req.query.secretKey;
    // if (!secretKey) {
    //   return res.status(400).send({ message: "SecretKey é necessária" });
    // }

    // const baseOmie = await BaseOmie.findOne({ secretKey });

    // if (!baseOmie) throw new Error("Base omie não encontrada");
    // if (baseOmie?.status !== "ativo") throw new Error("Base omie inativa!");

    // req.body.baseOmie = baseOmie;

    next();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};
