import z from "zod";
import { Template } from "../../models/template.js";

const templateUpdateSchema = z.object({
  nome: z.string().min(1).optional(),
  descricao: z.string().optional(),
  templateEjs: z.string().min(1).optional(),
  status: z.enum(["ativo", "inativo"]).optional(),
});

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, templateEjs, descricao, status } = templateUpdateSchema.parse(
      req.body
    );

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ message: "Template não encontrado." });
    }

    if (nome) template.nome = nome;
    if (descricao) template.descricao = descricao;
    if (templateEjs) template.templateEjs = templateEjs;
    if (status) template.status = status;

    await template.save();

    res.status(200).json(template);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
