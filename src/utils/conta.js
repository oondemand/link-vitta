import crypto from "node:crypto";

export const criarConta = async ({
  pedido,
  parcela,
  dataVencimento,
  valor,
}) => {
  let distribuicao = [];
  pedido.departamentos_consulta.map((departamento) => {
    distribuicao.push({
      cCodDep: departamento.cCodDepto,
      nPerDep: departamento.nPerc,
    });
  });

  const conta = {
    codigo_lancamento_integracao: crypto.randomUUID(),
    codigo_cliente_fornecedor: pedido.cabecalho_consulta.nCodFor,
    data_vencimento: dataVencimento,
    valor_documento: valor,
    numero_parcela: parcela,
    codigo_categoria: pedido.cabecalho_consulta.cCodCateg,
    data_previsao: dataVencimento,
    id_conta_corrente: pedido.cabecalho_consulta.nCodCC,
    data_emissao: pedido.cabecalho_consulta.dDtPrevisao,
    data_entrada: pedido.cabecalho_consulta.dDtPrevisao,
    codigo_projeto: pedido.cabecalho_consulta.nCodProj,
    observacao: pedido.cabecalho_consulta.cObs,
    numero_pedido: pedido.cabecalho_consulta.cNumero,
    aprendizado_rateio: "S",
    distribuicao,
  };
  return conta;
};

export const pedidoAlterado = ({ nCodPed, observacao }) => {
  const pedido = {
    cabecalho_alterar: {
      nCodPed: nCodPed,
      cObs: observacao,
    },
  };
  return pedido;
};
