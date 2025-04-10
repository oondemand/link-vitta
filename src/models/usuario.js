import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

UserSchema.methods.gerarToken = function () {
  return jwt.sign({ id: this._id }, env.JWT_SECRET, {
    expiresIn: "24h", // Token expira em 24 horas
  });
};

export const Usuario = mongoose.model("Usuario", UserSchema);
