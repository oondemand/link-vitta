import { Usuario } from "../../models/usuario.js";

export const listAll = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().select("-senha -__v");
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
