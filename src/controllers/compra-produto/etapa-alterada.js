import { env } from "../../config/env.js";
import { link } from "../../services/link.js";
import { BaseOmie } from "../../models/base-omie.js";

export const etapaAlterada = async (req, res) => {
  console.log("------------------------------------");
  console.log("🔄 Recebendo webhook de etapa alterada");

  if (req.body.ping) return res.send({ pong: true });

  const { appKey, event, author } = req.body;
  const { cEtapa, nCodPed, cNumero } = event.cabecalho_consulta;

  console.log(`📎 Etapa: ${cEtapa}, Etapa link: ${env.ETAPA_LINK}`);

  if (String(cEtapa) === env.ETAPA_LINK) {
    const baseOmie = await BaseOmie.findOne({ appKey });

    if (!baseOmie) {
      console.log("🟥 [ERRO]: Base omie não encontrada");
      return res.status(400).send({ message: "Base omie não encontrada" });
    }

    link({ baseOmie, nCodPed, autor: author, cNumero });
  }

  res.send();
};
