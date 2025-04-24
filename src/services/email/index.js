import client from "@sendgrid/mail";
import { env } from "../../config/env.js";

const enviarEmail = async ({ dest, remetente, subject, mensagem, anexos }) => {
  try {
    client.setApiKey(env.SENDGRID_API_KEY);

    const email = {
      personalizations: [
        {
          to: dest?.split(",")?.map((email) => ({
            email: email.trim(),
          })),
        },
      ],
      from: {
        email: remetente.email,
        name: remetente.nome,
      },
      subject,
      content: [
        {
          type: "text/html",
          value: mensagem,
        },
      ],
      attachments: anexos?.map(({ filename, fileBuffer }) => ({
        content: fileBuffer.toString("base64"),
        filename: filename,
        disposition: "attachment",
      })),
    };

    await client.send(email);
  } catch (error) {
    console.log(
      "Erro ao enviar email::",
      error?.response?.body?.errors || error
    );
  }
};

export const EmailService = { enviarEmail };
