'use client'

import { useEffect, useState } from "react";
import Container from '../Container';
import { supabase } from '@/lib/supabase';

export default function ProgramacaoPage() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: ags } = await supabase.from('agendamentos').select('*').order('data_hora', { ascending: true });
      const { data: pls } = await supabase.from('playlists').select('id, name');
      setAgendamentos(ags || []);
      setPlaylists(pls || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  function getPlaylistName(id: number) {
    return playlists.find((p) => p.id === id)?.name || '---';
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold text-[#a85b1a] mb-8 text-center">Grade de Programação</h1>
      <div className="flex justify-center">
        <div className="bg-[#fff3e6] rounded-xl p-8 shadow-lg w-full max-w-2xl">
          {loading ? (
            <div className="text-center text-[#a85b1a]">Carregando programação...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#a85b1a] text-lg">
                  <th className="py-2">Horário</th>
                  <th className="py-2">Programa</th>
                  <th className="py-2">Playlist</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-4 text-[#c96a2b]">Nenhuma programação agendada.</td></tr>
                )}
                {agendamentos.map((ag) => (
                  <tr key={ag.id}>
                    <td className="py-2">
                      {new Date(ag.data_hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      {ag.horario_fim && ` - ${ag.horario_fim.slice(0,5)}`}
                    </td>
                    <td className="py-2 font-semibold">{ag.nome_programa}</td>
                    <td className="py-2">{getPlaylistName(ag.playlist_id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Container>
  );
} 