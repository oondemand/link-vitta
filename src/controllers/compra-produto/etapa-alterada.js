import { env } from "../../config/env.js";
import { link } from "../../services/link.js";
import { BaseOmie } from "../../models/base-omie.js";

export const etapaAlterada = async (req, res) => {
  if (req.body.ping) return res.send({ pong: true });

  const { appKey, event, author } = req.body;
  const { cEtapa, nCodPed } = event.cabecalho_consulta;

  const baseOmie = await BaseOmie.findOne({ appKey });

  if (!baseOmie)
    return res.status(400).send({ message: "Base omie não encontrada" });

  if (String(cEtapa) === env.ETAPA_LINK)
    link({ baseOmie, nCodPed, autor: author });

  res.send();
};
