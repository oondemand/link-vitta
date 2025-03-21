import { apiOmie } from "../../config/api-omie.js";

const incluir = async ({ appKey, appSecret, conta }) => {
  try {
    const body = {
      call: "IncluirContaPagar",
      app_key: appKey,
      app_secret: appSecret,
      param: [conta],
    };

    const response = await apiOmie.post("financas/contapagar/", body);
    return response.data;
  } catch (error) {
    if (error.response)
      throw (
        "Erro ao incluir financas/contapaga: " +
        JSON.stringify(error.response.data, null, 2)
      );
    else throw "Erro ao incluir financas/contapaga: " + error;
  }
};

export const contaPagarService = { incluir };
