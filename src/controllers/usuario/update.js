import z from "zod";
import { Usuario } from "../../models/usuario.js";

const userUpdateSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  senha: z.string().min(6).optional(),
});

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, nome, senha } = userUpdateSchema.parse(req.body);

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (email) {
      const existingUser = await Usuario.findOne({ email: email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(409).json({ message: "Email já está em uso." });
      }

      usuario.email = email;
    }

    if (nome) usuario.nome = nome;
    if (senha) usuario.senha = senha;

    await usuario.save();

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
