'use client'

import { useState } from 'react';

const mockPedidos = [
  { id: 1, nome: 'João', musica: 'Ousado Amor', mensagem: 'Dedico para minha família', atendido: false },
  { id: 2, nome: 'Maria', musica: 'A Casa É Sua', mensagem: '', atendido: true },
];

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState(mockPedidos);

  const marcarAtendido = (id: number) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, atendido: true } : p));
  };
  const excluir = (id: number) => {
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#a85b1a] mb-6">Pedidos de Música</h1>
      <div className="bg-[#fff3e6] rounded-xl p-6 shadow-lg">
        {pedidos.length === 0 ? (
          <div className="text-[#a85b1a] text-center">Nenhum pedido recebido.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {pedidos.map(p => (
              <li key={p.id} className="border-b border-[#ffe6b3] pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className="font-bold text-[#a85b1a]">{p.nome}</span> pediu <span className="font-semibold">{p.musica}</span>
                  {p.mensagem && <span className="ml-2 text-[#c96a2b] italic">&ldquo;{p.mensagem}&rdquo;</span>}
                </div>
                <div className="flex gap-2">
                  {!p.atendido && <button onClick={() => marcarAtendido(p.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Atendido</button>}
                  <button onClick={() => excluir(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 