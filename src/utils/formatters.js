export function formatarParcela({ numeroParcelaAtual, totalParcelas }) {
  return `${String(numeroParcelaAtual).padStart(3, "0")}/${String(
    totalParcelas
  ).padStart(3, "0")}`;
}
