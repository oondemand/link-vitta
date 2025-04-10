import { Usuario } from "../../models/usuario.js";

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
