'use client'

import { useState } from 'react';

const mockChat = [
  { id: 1, nome: 'Lucas', mensagem: 'Boa noite a todos!' },
  { id: 2, nome: 'Priscila', mensagem: 'Amo essa rádio!' },
];

export default function AdminChatPage() {
  const [mensagens, setMensagens] = useState(mockChat);

  const excluir = (id: number) => {
    setMensagens(mensagens.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#a85b1a] mb-6">Mensagens do Chat</h1>
      <div className="bg-[#fff3e6] rounded-xl p-6 shadow-lg">
        {mensagens.length === 0 ? (
          <div className="text-[#a85b1a] text-center">Nenhuma mensagem no chat.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {mensagens.map(m => (
              <li key={m.id} className="border-b border-[#ffe6b3] pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className="font-bold text-[#a85b1a]">{m.nome}</span>: <span className="text-[#c96a2b] italic">{m.mensagem}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => excluir(m.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 