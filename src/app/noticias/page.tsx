'use client'

import Container from '../Container';

const noticias = [
  { titulo: 'Devocional: Confie no Senhor', resumo: 'Uma palavra de fé para o seu dia.', data: '11/06/2025' },
  { titulo: 'Evento: Vigília de Louvor', resumo: 'Participe da nossa vigília especial!', data: '15/06/2025' },
  { titulo: 'Notícia: Nova programação', resumo: 'Confira os novos horários dos programas.', data: '10/06/2025' },
];

export default function NoticiasPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Notícias & Devocionais</h1>
      <div className="grid gap-8 justify-center">
        {noticias.map((item, idx) => (
          <div key={idx} className="bg-[#fff3e6] rounded-xl p-6 shadow-lg max-w-xl mx-auto">
            <div className="text-[#a85b1a] font-bold text-xl mb-1">{item.titulo}</div>
            <div className="text-[#c96a2b] mb-2">{item.data}</div>
            <div>{item.resumo}</div>
          </div>
        ))}
      </div>
    </Container>
  );
} 