import { Usuario } from "../../models/usuario.js";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

export const login = async (req, res, next) => {
  const { email, senha } = loginSchema.parse(req.body);

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return res.status(404).json({ mensagem: "Usuário não encontrado" });

    if (!bcrypt.compare(senha, usuario.senha))
      return res.status(401).json({ mensagem: "Credenciais inválidas" });

    res.json({
      token: usuario.gerarToken(),
      usuario: {
        _id: usuario._id,
        nome: usuario.nome,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const validarToken = async (req, res) => {
  try {
    res.json(req.usuario);
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
