import { useState, useEffect } from "react";
import type { RegistroCompra } from "../types/RegistroCompra";

interface Props {
  onSubmit: (r: RegistroCompra) => void;
  editing?: RegistroCompra | null;
  onCancelEdit?: () => void;
}

export function FormRegistro({ onSubmit, editing, onCancelEdit }: Props) {
  const [data, setData] = useState("");
  const [infoCompra, setInfoCompra] = useState("");
  const [valor, setValor] = useState("");
  const [local, setLocal] = useState("");
  const [documento, setDocumento] = useState("");
  const [comprovante, setComprovante] = useState(true);

  useEffect(() => {
    if (editing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(editing.data);
      setInfoCompra(editing.infoCompra);
      setValor(editing.valor.toString());
      setLocal(editing.local);
      setDocumento(editing.documento || "");
      setComprovante(editing.comprovante);
    }
  }, [editing]);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    const registro: RegistroCompra = {
      id: editing ? editing.id : crypto.randomUUID(),
      data,
      infoCompra,
      valor: parseFloat(valor),
      local,
      documento,
      comprovante,
    };

    onSubmit(registro);

    if (!editing) {
      setData("");
      setInfoCompra("");
      setValor("");
      setLocal("");
      setDocumento("");
      setComprovante(true);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white shadow p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <label className="block font-medium mb-1">Data</label>
        <input 
          required
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Informação da compra</label>
        <input
          required
          value={infoCompra}
          onChange={e => setInfoCompra(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Valor</label>
        <input
          required
          type="number"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Local</label>
        <input
          required
          value={local}
          onChange={e => setLocal(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          checked={comprovante}
          onChange={e => setComprovante(e.target.checked)}
          className="h-5 w-5"
        />
        <label className="font-medium">Possui comprovante?</label>
      </div>

      <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
        <button
          type="submit"
          className="
            bg-green-600 text-white px-5 py-2 rounded-md 
            shadow hover:bg-green-700 active:bg-green-800 transition
          "
        >
          {editing ? "Salvar alterações" : "Adicionar registro"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
