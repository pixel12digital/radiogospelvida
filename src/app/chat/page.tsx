'use client'

import { useState } from 'react';

export default function ChatPage() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  // Mock de resposta do admin
  const [resposta, setResposta] = useState('Olá! Em breve um administrador responderá sua mensagem.');

  const handleEnviar = (e: any) => {
    e.preventDefault();
    setEnviado(true);
    // Aqui você pode integrar com Supabase futuramente
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Chat ao Vivo</h1>
      <div className="flex flex-col gap-6 items-center">
        {!enviado ? (
          <form onSubmit={handleEnviar} className="bg-[#fff3e6] rounded-xl p-6 shadow-lg w-full flex flex-col gap-4">
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              className="px-3 py-2 rounded border border-[#a85b1a]"
              required
            />
            <textarea
              value={mensagem}
              onChange={e => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem para o administrador"
              className="px-3 py-2 rounded border border-[#a85b1a]"
              required
            />
            <button type="submit" className="bg-[#a85b1a] text-white px-4 py-2 rounded font-semibold hover:bg-[#c96a2b]">Enviar</button>
          </form>
        ) : (
          <div className="bg-[#fff3e6] rounded-xl p-6 shadow-lg w-full text-center">
            <div className="mb-4">
              <span className="font-bold text-[#a85b1a]">Você:</span> <span className="text-[#c96a2b] italic">{mensagem}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold text-[#a85b1a]">Admin:</span> <span className="text-[#c96a2b] italic">{resposta}</span>
            </div>
            <button onClick={() => { setEnviado(false); setMensagem(''); }} className="mt-4 bg-[#a85b1a] text-white px-4 py-2 rounded font-semibold hover:bg-[#c96a2b]">Nova mensagem</button>
          </div>
        )}
      </div>
    </div>
  );
} 