'use client'

import Container from '../Container';

export default function ProgramacaoPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Grade de Programação</h1>
      <div className="flex justify-center">
        <div className="bg-[#fff3e6] rounded-xl p-8 shadow-lg w-full max-w-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#a85b1a] text-lg">
                <th className="py-2">Horário</th>
                <th className="py-2">Programa</th>
                <th className="py-2">Locutor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">06:00 - 09:00</td>
                <td className="py-2">Manhã de Louvor</td>
                <td className="py-2">Pr. João</td>
              </tr>
              <tr>
                <td className="py-2">09:00 - 12:00</td>
                <td className="py-2">Louvor da Manhã</td>
                <td className="py-2">Maria Souza</td>
              </tr>
              <tr>
                <td className="py-2">12:00 - 14:00</td>
                <td className="py-2">Palavra e Vida</td>
                <td className="py-2">Ev. Carlos</td>
              </tr>
              <tr>
                <td className="py-2">14:00 - 18:00</td>
                <td className="py-2">Tarde de Adoração</td>
                <td className="py-2">Ana Paula</td>
              </tr>
              <tr>
                <td className="py-2">18:00 - 20:00</td>
                <td className="py-2">Noite de Vitória</td>
                <td className="py-2">Pr. João</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
} 