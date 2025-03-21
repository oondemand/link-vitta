import { pedidoCompraService } from "./omie/pedidoCompraService.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const link = async ({ baseOmie, nCodPed, author }) => {
  try {
    console.log(
      `Iniciando processo de link entre pedido de compra ${nCodPed} e contas a pagar`
    );

    const pedido = await pedidoCompraService.consultar({
      appKey: baseOmie.appKey,
      appSecret: baseOmie.appSecret,
      nCodPed,
    });

    if (!pedido) throw new Error("Pedido de compra não encontrado");

    const dataAtual = format(new Date(), "dd/MM/yy HH:mm", { locale: ptBR });

    let msg = "Link para contas a pagar:\n";

    
  } catch (error) {}
};
