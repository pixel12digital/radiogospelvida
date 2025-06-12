'use client'

import { useState } from 'react';

const mockRecados = [
  { id: 1, nome: 'Carlos', recado: 'Parabéns pela programação!', lido: false },
  { id: 2, nome: 'Ana', recado: 'Manda um alô para minha igreja!', lido: true },
];

export default function AdminRecadosPage() {
  const [recados, setRecados] = useState(mockRecados);

  const marcarLido = (id: number) => {
    setRecados(recados.map(r => r.id === id ? { ...r, lido: true } : r));
  };
  const excluir = (id: number) => {
    setRecados(recados.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#a85b1a] mb-6">Recados dos Ouvintes</h1>
      <div className="bg-[#fff3e6] rounded-xl p-6 shadow-lg">
        {recados.length === 0 ? (
          <div className="text-[#a85b1a] text-center">Nenhum recado recebido.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {recados.map(r => (
              <li key={r.id} className="border-b border-[#ffe6b3] pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className="font-bold text-[#a85b1a]">{r.nome}</span>: <span className="text-[#c96a2b] italic">{r.recado}</span>
                </div>
                <div className="flex gap-2">
                  {!r.lido && <button onClick={() => marcarLido(r.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Lido</button>}
                  <button onClick={() => excluir(r.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 