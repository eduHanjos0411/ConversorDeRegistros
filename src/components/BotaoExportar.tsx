import { exportarExcel } from "../utils/exportarExcel";
import type { RegistroCompra } from "../types/RegistroCompra";

interface Props {
  titulo: string;
  registros: RegistroCompra[];
}

export function BotaoExportar({ titulo, registros }: Props) {
  return (
    <button
      onClick={() => exportarExcel(titulo, registros)}
      className="
        mt-6 px-6 py-3 
        bg-blue-600 text-white font-semibold 
        rounded-lg shadow 
        hover:bg-blue-700 
        active:bg-blue-800 
        transition-colors
      "
    >
      Gerar XLSX
    </button>
  );
}
