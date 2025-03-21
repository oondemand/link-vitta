import puppeteer from "puppeteer";

const gerar = async ({ html }) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();
    return pdf;
  } catch (error) {
    console.log(error.stack);
    throw new Error(`Erro ao gerar PDF: ${error.stack}`);
  }
};

export const pdf = { gerar };
