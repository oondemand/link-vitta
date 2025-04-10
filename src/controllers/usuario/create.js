import { z } from "zod";
import { Usuario } from "../../models/usuario.js";

const userSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
});

export const create = async (req, res, next) => {
  const { nome, email, senha } = userSchema.parse(req.body);
  try {
    const novoUsuario = new Usuario({
      email,
      nome,
      senha,
    });

    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
