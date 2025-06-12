'use client'

import Container from '../Container';

const equipe = [
  { nome: 'Pr. João', funcao: 'Locutor', foto: '/locutor1.png' },
  { nome: 'Maria Souza', funcao: 'Apresentadora', foto: '/locutor2.png' },
  { nome: 'Ev. Carlos', funcao: 'Locutor', foto: '/locutor3.png' },
  { nome: 'Ana Paula', funcao: 'DJ', foto: '/locutor4.png' },
];

export default function EquipePage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Nossa Equipe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
        {equipe.map((pessoa, idx) => (
          <div key={idx} className="bg-[#fff3e6] rounded-xl p-6 flex items-center gap-6 shadow-lg">
            <img src={pessoa.foto} alt={pessoa.nome} className="w-24 h-24 rounded-full border-4 border-[#a85b1a] object-cover" />
            <div>
              <div className="font-bold text-[#a85b1a] text-xl">{pessoa.nome}</div>
              <div className="text-[#c96a2b]">{pessoa.funcao}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
} 