import axios from "axios";
import { env } from "./env.js";

export const apiOmie = axios.create({
  baseURL: env.API_OMIE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
