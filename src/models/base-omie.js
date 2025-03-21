import mongoose from "mongoose";

const BaseOmieSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cnpj: String,
    status: {
      type: String,
      default: "ativo",
      enum: ["ativo", "inativo"],
    },
    appKey: { type: String, required: true },
    appSecret: { type: String, required: true },
  },
  { timestamps: true }
);

export const BaseOmie = mongoose.model("BaseOmie", BaseOmieSchema);
