'use client'

import { useState } from 'react';

function ChatModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [resposta, setResposta] = useState('Olá! Em breve um administrador responderá sua mensagem.');

  const whatsappNumber = '5511981089874';

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    const texto = `Olá, meu nome é ${nome}. Mensagem: ${mensagem}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    setEnviado(true);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30">
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg w-full max-w-md mx-auto p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#a85b1a] text-2xl font-bold">×</button>
        <h2 className="text-xl font-bold text-[#a85b1a] mb-4 text-center">Chat ao Vivo</h2>
        {!enviado ? (
          <form onSubmit={handleEnviar} className="flex flex-col gap-4">
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
          <div className="text-center">
            <div className="mb-4">
              <span className="font-bold text-[#a85b1a]">Mensagem enviada pelo WhatsApp!</span>
            </div>
            <button onClick={() => { setEnviado(false); setMensagem(''); setNome(''); }} className="mt-4 bg-[#a85b1a] text-white px-4 py-2 rounded font-semibold hover:bg-[#c96a2b]">Nova mensagem</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-40 bg-[#a85b1a] hover:bg-[#c96a2b] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl"
        onClick={() => setChatOpen(true)}
        aria-label="Abrir chat"
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
} 