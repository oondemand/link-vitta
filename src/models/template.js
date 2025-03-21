import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String },
    templateEjs: { type: String, required: true },
    status: {
      type: String,
      default: "ativo",
      enum: ["ativo", "inativo"],
    },
  },
  { timestamps: true }
);

export const Template = mongoose.model("Template", TemplateSchema);
