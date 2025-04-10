import z from "zod";
import { BaseOmie } from "../../models/base-omie.js";

const baseOmieUpdateSchema = z.object({
  nome: z.string().optional(),
  cnpj: z.string().optional(),
  appKey: z.string().optional(),
  appSecret: z.string().optional(),
  status: z.enum(["ativo", "inativo"]).optional(),
});

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, cnpj, appKey, appSecret, status } =
      baseOmieUpdateSchema.parse(req.body);

    const baseOmie = await BaseOmie.findById(id);
    if (!baseOmie) {
      return res.status(404).json({ message: "Base Omie não encontrada." });
    }

    if (nome) baseOmie.nome = nome;
    if (cnpj) baseOmie.cnpj = cnpj;
    if (appKey) baseOmie.appKey = appKey;
    if (appSecret) baseOmie.appSecret = appSecret;
    if (status) baseOmie.status = status;

    await baseOmie.save();

    res.status(200).json(baseOmie);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
