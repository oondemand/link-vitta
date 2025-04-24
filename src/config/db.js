import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      user: env.DB_USER,
      pass: env.DB_PASSWORD,
    });
    console.log(`Conectado ao MongoDB`);
  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB:`, err);
    process.exit(1);
  }
};
