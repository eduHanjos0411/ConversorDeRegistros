import { useLocalStorage } from "./hooks/useLocalStorage";
import type { RegistroCompra } from "./types/RegistroCompra";
import { FormRegistro } from "./components/FormRegistro";
import { TabelaRegistros } from "./components/TabelaRegistros";
import { BotaoExportar } from "./components/BotaoExportar";
import { useState } from "react";

export default function App() {
  const [registros, setRegistros] = useLocalStorage<RegistroCompra[]>("registros", []);
  const [editando, setEditando] = useState<RegistroCompra | null>(null);
  const [titulo, setTitulo] = useState("Minhas Compras");

  function adicionarOuAtualizar(registro: RegistroCompra) {
    if (editando) {
      setRegistros(registros.map(r => (r.id === registro.id ? registro : r)));
      setEditando(null);
    } else {
      setRegistros([...registros, registro]);
    }
  }

  function remover(id: string) {
    setRegistros(registros.filter(r => r.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Sistema de Compras</h1>

        <div className="mb-4">
          <label className="block font-medium mb-1">Título da planilha:</label>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="w-full md:w-1/2 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <FormRegistro
          onSubmit={adicionarOuAtualizar}
          editing={editando}
          onCancelEdit={() => setEditando(null)}
        />

        <TabelaRegistros
          registros={registros}
          onEdit={setEditando}
          onDelete={remover}
        />

        <BotaoExportar titulo={titulo} registros={registros} />
      </div>
    </div>
  );
}
