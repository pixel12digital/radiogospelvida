'use client'

import Container from '../Container';
import { useState } from 'react';

export default function RecadosPage() {
  const [nome, setNome] = useState('');
  const [recado, setRecado] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Envie seu Recado</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          {enviado ? (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">Recado enviado com sucesso!</div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#fff3e6] rounded-xl p-8 shadow-lg flex flex-col gap-4">
              <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="px-3 py-2 rounded border border-[#a85b1a]" required />
              <textarea value={recado} onChange={e => setRecado(e.target.value)} placeholder="Digite seu recado" className="px-3 py-2 rounded border border-[#a85b1a]" required />
              <button type="submit" className="bg-[#a85b1a] text-white px-4 py-2 rounded font-semibold hover:bg-[#c96a2b]">Enviar Recado</button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
} 