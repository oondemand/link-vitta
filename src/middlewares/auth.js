export const authenticateBySecretKey = async (req, res, next) => {
  try {
    const secretKey = req.headers.secretkey || req.query.secretKey;
    if (!secretKey) {
      return res.status(400).send({ message: "SecretKey é necessária" });
    }

    // const sistemaData = await msAppOonDemand.get(
    //   `sistema?app.secretKey=${secretKey}`
    // );
    // const sistema = sistemaData.data[0];

    // if (!sistema) {
    //   throw new Error("Sistema não encontrado");
    // }

    // if (sistema.status !== "ativo") {
    //   throw new Error("Sistema inativo");
    // }

    req.headers.secretkey = secretKey;
    delete req.query.secretKey;

    next();
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};
