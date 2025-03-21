import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.string().default("3000"),
  SERVICE_VERSION: z.string().default("1.0.0"),
  ETAPA_LINK: z.string(),
  MONGO_URI: z.string().default(""),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("🟥 [ERRO]: Variáveis ambiente", _env.error.format());
  throw new Error("Variáveis ambiente não encontradas");
}

export const env = _env.data;
