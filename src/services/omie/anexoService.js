import { compactFile } from "../../utils/fileHandler.js";
import { apiOmie } from "../../config/api-omie.js";

const incluir = async ({
  appKey,
  appSecret,
  tabela,
  id,
  nomeArquivo,
  tipoArquivo,
  arquivo,
}) => {
  try {
    const arquivoCompactado = await compactFile({
      fileBuffer: arquivo,
      filename: nomeArquivo,
    });

    const param = {
      cCodIntAnexo: "",
      cTabela: tabela,
      nId: id,
      cNomeArquivo: nomeArquivo,
      cTipoArquivo: tipoArquivo,
      cArquivo: arquivoCompactado.base64File,
      cMd5: arquivoCompactado.md5,
    };

    const body = {
      call: "IncluirAnexo",
      app_key: appKey,
      app_secret: appSecret,
      param: [param],
    };

    const response = await apiOmie.post("geral/anexo/", body);
    return response.data;
  } catch (error) {
    console.log("anexoService.incluir: ", error);
    throw "Erro ao incluir anexo: " + error;
  }
};

export const anexoService = { incluir };
