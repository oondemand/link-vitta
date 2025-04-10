import z from "zod";
import { Usuario } from "../../models/usuario.js";

const userSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
});

export const createFirstUser = async (req, res, next) => {
  try {
    const { nome, email, senha } = userSchema.parse(req.body);

    const usuario = await Usuario.findOne();

    if (usuario) {
      return res
        .status(409)
        .json({ message: "Já existe um usuário cadastrado!" });
    }

    const novoUsuario = new Usuario({
      email,
      nome,
      senha,
    });

    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    next(error);
  }
};
