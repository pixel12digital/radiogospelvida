'use client'

import Image from 'next/image';
import Container from '../Container';

const patrocinadores = [
  { nome: 'Loja da Fé', logo: '/patro1.png' },
  { nome: 'Livraria Esperança', logo: '/patro2.png' },
  { nome: 'Supermercado Bom Preço', logo: '/patro3.png' },
];

export default function PatrocinadoresPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Patrocinadores</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
        {patrocinadores.map((patro, idx) => (
          <div key={idx} className="bg-[#fff3e6] rounded-xl p-6 flex flex-col items-center shadow-lg">
            <Image src={patro.logo} alt={patro.nome} width={112} height={112} className="object-contain mb-2" />
            <div className="font-bold text-[#a85b1a] text-lg">{patro.nome}</div>
          </div>
        ))}
      </div>
    </Container>
  );
} 