import { apiOmie } from "../../config/api-omie.js";

const consultar = async ({ appKey, appSecret, codCliente }) => {
  try {
    const body = {
      call: "ConsultarCliente",
      app_key: appKey,
      app_secret: appSecret,
      param: [
        {
          codigo_cliente_omie: codCliente,
        },
      ],
    };

    const response = await apiOmie.post("geral/clientes/", body);
    return response.data;
  } catch (error) {
    throw "Erro ao consultar cliente: " + error;
  }
};

export const clienteService = { consultar };
