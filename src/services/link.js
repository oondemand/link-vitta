import { pedidoCompraService } from "./omie/pedidoCompraService.js";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Template } from "../models/template.js";
import { departamentoService } from "./omie/departamentoService.js";
import { clienteService } from "./omie/clienteService.js";
import { formatarParcela } from "../utils/formatters.js";
import { delay } from "../utils/index.js";
import { pdf } from "./pdf/index.js";
import { criarConta } from "../utils/conta.js";
import { contaPagarService } from "./omie/contaPagarService.js";
import { anexoService } from "./omie/anexoService.js";
import { pedidoAlterado } from "../utils/conta.js";

import ejs from "ejs";

export const link = async ({ baseOmie, nCodPed, autor }) => {
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

    const template = await Template.findOne({ nome: "pedido-de-compra" });
    // if (!template) throw new Error("Template não encontrado");

    const departamentos = await departamentoService.listar({
      appKey: baseOmie.appKey,
      appSecret: baseOmie.appSecret,
    });

    const fornecedor = await clienteService.consultar({
      appKey: baseOmie.appKey,
      appSecret: baseOmie.appSecret,
      codCliente: pedido.cabecalho_consulta.nCodFor,
    });

    const templateVariables = {
      pedido,
      departamentos,
      fornecedor,
      autor,
      empresa: baseOmie,
      dataAtual,
    };

    const html = ejs.render(template.templateEjs, templateVariables);
    const pdfBuffer = await pdf.gerar({ html });

    const totalParcelas = pedido.parcelas_consulta.length;

    for (const [index, parcela] of pedido.parcelas_consulta.entries()) {
      console.log("Incluindo conta: ", index + 1, "de", totalParcelas);

      const parcelaFormatada = formatarParcela({
        numeroParcelaAtual: index + 1,
        totalParcelas,
      });

      const conta = await criarConta({
        pedido,
        parcela: parcelaFormatada,
        dataVencimento: parcela.dVencto,
        valor: parcela.nValor,
      });

      // console.log("Conta criada: ", JSON.stringify(conta));

      const contaIncluida = await contaPagarService.incluir({
        appKey: baseOmie.appKey,
        appSecret: baseOmie.appSecret,
        conta,
      });

      const id = contaIncluida.codigo_lancamento_omie;
      const numeroPedido = pedido.cabecalho_consulta.cNumero;

      await anexoService.incluir({
        appKey: baseOmie.appKey,
        appSecret: baseOmie.appSecret,
        id,
        arquivo: pdfBuffer,
        tabela: "conta-pagar",
        nomeArquivo: `pedido-de-compra-${numeroPedido}.pdf`,
        tipoArquivo: "pdf",
      });

      msg += `Conta ${id} cadastrada\n`;
      console.log(`Conta ${id} cadastrada\n`);

      await delay(3000); // aguarda um tempo antes de realizar a nova operação
    }

    console.log("Alterando etapa do pedido de compra...");
    const novaObs = msg + pedido.cabecalho_consulta.cObs;

    const pedidoNovo = pedidoAlterado({
      nCodPed: pedido.cabecalho_consulta.nCodPed,
      observacao: novaObs,
    });

    pedidoCompraService.alterar({
      appKey: baseOmie.appKey,
      appSecret: baseOmie.appSecret,
      pedido: pedidoNovo,
    });

    console.log("🟩 Pedido de compra alterado", pedido, fornecedor, autor);

    // await enviarEmail(pedido, fornecedor, autor);

    console.log("Processo finalizado");
  } catch (error) {
    console.log(error);
  }
};
