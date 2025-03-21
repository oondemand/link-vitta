import { apiOmie } from "../../config/api-omie.js";

const listar = async ({ appKey, appSecret }) => {
  try {
    const body = {
      call: "ListarDepartamentos",
      app_key: appKey,
      app_secret: appSecret,
      param: [
        {
          pagina: 1,
          registros_por_pagina: 50,
        },
      ],
    };

    const response = await apiOmie.post("geral/departamentos/", body);
    return response.data;
  } catch (error) {
    throw "Erro ao listar departamentos: " + error;
  }
};

export const departamentoService = { listar };
