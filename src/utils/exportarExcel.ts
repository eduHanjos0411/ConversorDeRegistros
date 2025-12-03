import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import type { RegistroCompra } from "../types/RegistroCompra";

export async function exportarExcel(titulo: string, registros: RegistroCompra[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Registros");

  // Linha 1: Título simples na coluna A
  worksheet.getCell("A1").value = titulo;

  // Linha 2 em branco
  worksheet.addRow([]);

  // Nenhum cabeçalho — inicia os registros diretamente
  let excelRowIndex = 3;

  registros.forEach((r) => {
    const doc = r.documento ? `${r.local} (${r.documento})` : r.local;

    // Converter "YYYY-MM-DD" para Date
    const dataExcel = r.data ? new Date(r.data + "T00:00:00") : null;

    const row = worksheet.addRow([
      dataExcel,
      r.infoCompra,
      "",
      r.valor,
      doc
    ]);

    // Formatação da data
    const dataCell = worksheet.getCell(`A${excelRowIndex}`);
    dataCell.numFmt = "dd/mm";

    // Formatação de moeda
    const valorCell = worksheet.getCell(`D${excelRowIndex}`);
    valorCell.numFmt = "R$ #,##0.00";

    // Linhas sem comprovante → vermelho
    if (!r.comprovante) {
      row.eachCell((cell) => {
        cell.font = { color: { argb: "FFFF0000" } };
      });
    }

    excelRowIndex++;
  });

  // ===============================
  // TOTAL FINAL (somente valor)
  // ===============================

  const total = registros.reduce((acc, r) => acc + r.valor, 0);
  const totalRow = worksheet.addRow(["", "", "", total, ""]);

  const totalCell = totalRow.getCell(4);
  totalCell.numFmt = "R$ #,##0.00";
  totalCell.font = { bold: true };

  // ===============================
  // NOME DO ARQUIVO BASEADO NO TÍTULO
  // ===============================

  const nomeArquivoSeguro = titulo.replace(/[<>:"/\\|?*]/g, "").trim();
  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    nomeArquivoSeguro.length > 0 ? `${nomeArquivoSeguro}.xlsx` : "arquivo.xlsx"
  );
}
