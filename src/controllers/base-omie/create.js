import z from "zod";
import { BaseOmie } from "../../models/base-omie.js";

const baseOmieSchema = z.object({
  nome: z.string(),
  cnpj: z.string(),
  appKey: z.string(),
  appSecret: z.string(),
});

export const create = async (req, res, next) => {
  try {
    const { nome, cnpj, appKey, appSecret } = baseOmieSchema.parse(req.body);

    const novaBaseOmie = new BaseOmie({
      appKey,
      appSecret,
      cnpj,
      nome,
      usuario: req.usuario,
      status: "ativo",
    });

    await novaBaseOmie.save();
    res.status(201).json(novaBaseOmie);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
