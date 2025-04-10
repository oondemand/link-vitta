import { BaseOmie } from "../../models/base-omie.js";

export const deleteBase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const baseOmie = await BaseOmie.findByIdAndDelete(id);

    if (!baseOmie) {
      return res.status(404).json({ message: "Base Omie não encontrada." });
    }

    res.status(200).json({ message: "Base Omie excluída com sucesso." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
