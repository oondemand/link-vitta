import { Template } from "../../models/template.js";

export const deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const template = await Template.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: "Template não encontrado." });
    }

    res.status(200).json({ message: "Template excluído com sucesso." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
