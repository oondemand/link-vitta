import z from "zod";
import { Template } from "../../models/template.js";

const templateSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  templateEjs: z.string().min(1),
});

export const create = async (req, res, next) => {
  try {
    const { nome, descricao, templateEjs } = templateSchema.parse(req.body);

    const novoTemplate = new Template({
      nome,
      descricao,
      templateEjs,
      status: "ativo",
      usuario: req.usuario,
    });

    await novoTemplate.save();

    res.status(201).json(novoTemplate);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
