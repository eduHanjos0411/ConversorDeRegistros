import type { RegistroCompra } from "../types/RegistroCompra";

interface Props {
  registros: RegistroCompra[];
  onEdit: (r: RegistroCompra) => void;
  onDelete: (id: string) => void;
}

export function TabelaRegistros({ registros, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 font-medium">Data</th>
            <th className="p-3 font-medium">Informação</th>
            <th className="p-3 font-medium"></th>
            <th className="p-3 font-medium">Valor</th>
            <th className="p-3 font-medium">Local / Documento</th>
            <th className="p-3 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(r => (
            <tr
              key={r.id}
              className={`border-t ${
                r.comprovante ? "text-black" : "text-red-600"
              }`}
            >
              <td className="p-3">{r.data}</td>
              <td className="p-3">{r.infoCompra}</td>
              <td className="p-3"></td>
              <td className="p-3">{r.valor}</td>
              <td className="p-3">
                {r.local}
                {r.documento ? ` (${r.documento})` : ""}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(r)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(r.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
