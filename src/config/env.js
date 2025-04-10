import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.string().default("4000"),
  SERVICE_VERSION: z.string().default("1.0.0"),
  API_OMIE_BASE_URL: z.string().default("https://app.omie.com.br/api/v1/"),
  ETAPA_LINK: z.string(),
  MONGO_URI: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  EMAIL_FINANCEIRO: z.string(),
  SENDGRID_API_KEY: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("🟥 [ERRO]: Variáveis ambiente", _env.error.format());
  throw new Error("Variáveis ambiente não encontradas");
}

export const env = _env.data;
