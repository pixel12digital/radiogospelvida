'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [dj, setDj] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [musicas, setMusicas] = useState<any[]>([]);
  const [proximaProg, setProximaProg] = useState<any>(null);
  const [recados, setRecados] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [chat, setChat] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // DJ atual (radio_status)
      const { data: statusData } = await supabase
        .from('radio_status')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      setDj(statusData && statusData[0] ? statusData[0] : null);
      // Playlists
      const { data: playlistsData } = await supabase
        .from('playlists')
        .select('id')
        .eq('is_active', true);
      setPlaylists(playlistsData || []);
      // Músicas
      const { data: musicasData } = await supabase
        .from('musics')
        .select('id')
        .eq('is_active', true);
      setMusicas(musicasData || []);
      // Próxima programação (agendamentos)
      const now = new Date().toISOString();
      const { data: agData } = await supabase
        .from('agendamentos')
        .select('id, playlist_id, data_hora')
        .gt('data_hora', now)
        .order('data_hora', { ascending: true })
        .limit(1);
      if (agData && agData[0]) {
        // Buscar nome da playlist
        const { data: pl } = await supabase
          .from('playlists')
          .select('name')
          .eq('id', agData[0].playlist_id)
          .single();
        setProximaProg({
          nome: pl?.name || 'Programação',
          horario: new Date(agData[0].data_hora).toLocaleString('pt-BR'),
        });
      } else {
        setProximaProg(null);
      }
      // Últimos recados
      const { data: recadosData } = await supabase
        .from('recados')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setRecados(recadosData || []);
      // Últimos pedidos
      const { data: pedidosData } = await supabase
        .from('pedidos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setPedidos(pedidosData || []);
      // Últimas mensagens do chat
      const { data: chatData } = await supabase
        .from('chat_mensagens')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      setChat(chatData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-[#a85b1a] text-xl">Carregando dados do painel...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-[#a85b1a] mb-6">Visão Geral do Painel</h1>
        {/* Linha de cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card DJ */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <div className="text-[#a85b1a] font-bold text-lg mb-1">DJ Atual</div>
            <div className="text-[#c96a2b] font-semibold">{dj?.dj_name || '---'}</div>
            <div className={`text-xs mt-1 mb-2 font-bold ${dj?.is_live ? 'text-green-600' : 'text-gray-500'}`}>{dj?.is_live ? 'Online' : 'Offline'}</div>
            <div className="text-xs text-gray-700">Programa: <span className="font-semibold">{dj?.show_name || '---'}</span></div>
            <div className="text-xs text-gray-400">{dj?.created_at ? new Date(dj.created_at).toLocaleString('pt-BR') : ''}</div>
          </div>
          {/* Card Playlists */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <div className="text-[#a85b1a] font-bold text-lg mb-1">Playlists</div>
            <div className="text-3xl font-bold text-[#c96a2b]">{playlists.length}</div>
            <a href="/admin/playlists" className="mt-2 text-[#a85b1a] hover:underline text-sm font-semibold">Ver playlists</a>
          </div>
          {/* Card Músicas */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <div className="text-[#a85b1a] font-bold text-lg mb-1">Músicas</div>
            <div className="text-3xl font-bold text-[#c96a2b]">{musicas.length}</div>
            <a href="/admin/musicas" className="mt-2 text-[#a85b1a] hover:underline text-sm font-semibold">Ver músicas</a>
          </div>
          {/* Card Programação */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <div className="text-[#a85b1a] font-bold text-lg mb-1">Próxima Programação</div>
            <div className="font-semibold text-[#c96a2b]">{proximaProg?.nome || '---'}</div>
            <div className="text-xs text-gray-400">{proximaProg?.horario || '---'}</div>
            <a href="/admin/programacao" className="mt-2 text-[#a85b1a] hover:underline text-sm font-semibold">Ver programação</a>
          </div>
        </div>
        {/* Linha de cards de interações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Recados */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-lg font-bold text-[#a85b1a] mb-4">Últimos Recados</h2>
            <ul className="flex-1 space-y-3">
              {recados.map((r, i) => (
                <li key={r.id || i} className="border-b pb-2">
                  <div className="font-semibold text-[#c96a2b]">{r.nome}</div>
                  <div className="text-sm text-gray-700">{r.mensagem || r.recado}</div>
                  <div className="text-xs text-gray-400">{r.created_at ? new Date(r.created_at).toLocaleString('pt-BR') : ''}</div>
                </li>
              ))}
            </ul>
            <a href="/admin/recados" className="mt-4 text-[#a85b1a] hover:underline text-sm font-semibold">Ver todos</a>
          </div>
          {/* Card Pedidos */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-lg font-bold text-[#a85b1a] mb-4">Últimos Pedidos</h2>
            <ul className="flex-1 space-y-3">
              {pedidos.map((p, i) => (
                <li key={p.id || i} className="border-b pb-2">
                  <div className="font-semibold text-[#c96a2b]">{p.nome}</div>
                  <div className="text-sm text-gray-700">{p.pedido || p.musica}</div>
                  <div className="text-xs text-gray-400">{p.created_at ? new Date(p.created_at).toLocaleString('pt-BR') : ''}</div>
                </li>
              ))}
            </ul>
            <a href="/admin/pedidos" className="mt-4 text-[#a85b1a] hover:underline text-sm font-semibold">Ver todos</a>
          </div>
          {/* Card Chat */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-lg font-bold text-[#a85b1a] mb-4">Chat (Visitantes)</h2>
            <ul className="flex-1 space-y-3">
              {chat.map((c, i) => (
                <li key={c.id || i} className="border-b pb-2">
                  <div className="font-semibold text-[#c96a2b]">{c.nome}</div>
                  <div className="text-sm text-gray-700">{c.mensagem}</div>
                  <div className="text-xs text-gray-400">{c.created_at ? new Date(c.created_at).toLocaleString('pt-BR') : ''}</div>
                </li>
              ))}
            </ul>
            <a href="/admin/recados" className="mt-4 text-[#a85b1a] hover:underline text-sm font-semibold">Ver chat</a>
          </div>
        </div>
      </div>
    </main>
  );
} 