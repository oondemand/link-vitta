import { env } from "../../config/env.js";
import { link } from "../../services/link.js";

export const etapaAlterada = async (req, res) => {
  if (req.body.ping) return res.send({ pong: true });

  const secretKey = req.headers.secretkey;

  const { appKey, appHash, event, author } = req.body;
  const { cEtapa, nCodPed } = event.cabecalho_consulta;

  // if (cEtapa === env.ETAPA_LINK) link({ secretKey, appKey, nCodPed, author });

  res.send();
};
