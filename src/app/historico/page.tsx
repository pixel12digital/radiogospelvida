'use client'

import Container from '../Container';

const mockHistorico = [
  { horario: '12:30', musica: 'Ousado Amor', artista: 'Isaias Saad' },
  { horario: '12:26', musica: 'A Casa É Sua', artista: 'Casa Worship' },
  { horario: '12:22', musica: 'Me Atraiu', artista: 'Gabriela Rocha' },
  { horario: '12:18', musica: 'Lugar Secreto', artista: 'Gabriela Rocha' },
];

export default function HistoricoPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Histórico de Músicas</h1>
      <div className="flex justify-center">
        <div className="bg-[#fff3e6] rounded-xl p-8 shadow-lg w-full max-w-lg">
          <ul>
            {mockHistorico.map((item, idx) => (
              <li key={idx} className="py-2 border-b border-[#ffe6b3] flex justify-between">
                <span className="text-[#a85b1a] font-semibold">{item.horario}</span>
                <span>{item.musica} <span className="text-[#c96a2b]">-</span> {item.artista}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
} 