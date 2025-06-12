'use client'
import { useState } from 'react';

// Mock de músicas para visualização inicial
const mockMusics = [
  {
    id: 1,
    title: 'Música Exemplo 1',
    artist: 'Artista 1',
    album: 'Álbum 1',
    duration: 210,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    is_active: true,
  },
  {
    id: 2,
    title: 'Música Exemplo 2',
    artist: 'Artista 2',
    album: 'Álbum 2',
    duration: 185,
    file_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    is_active: true,
  },
];

export default function MusicasPage() {
  const [musics, setMusics] = useState(mockMusics);
  const [search, setSearch] = useState('');
  const [selectedMusic, setSelectedMusic] = useState<any>(null);
  const [showUpload, setShowUpload] = useState(false);

  // Filtro de busca
  const filteredMusics = musics.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.artist.toLowerCase().includes(search.toLowerCase())
  );

  // Funções mock para ações
  const handleEdit = (music: any) => alert('Editar: ' + music.title);
  const handleDelete = (music: any) => alert('Excluir: ' + music.title);
  const handleAddToPlaylist = (music: any) => alert('Adicionar à playlist: ' + music.title);
  const handlePlayNow = (music: any) => alert('Tocar agora: ' + music.title);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#1a0d0a]">Músicas</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Buscar por título ou artista..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded border border-[#c96a2b] text-[#1a0d0a]"
          />
          <button
            onClick={() => setShowUpload(true)}
            className="bg-[#c96a2b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e63946] transition"
          >
            + Upload de Música
          </button>
        </div>
      </div>

      {/* Área de upload (mock) */}
      {showUpload && (
        <div className="mb-6 bg-[#fff3e6] p-4 rounded-lg">
          <p className="mb-2 font-semibold">Arraste e solte arquivos de música aqui ou clique para selecionar.</p>
          <input type="file" accept="audio/*" className="mb-2" />
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Enviar</button>
            <button onClick={() => setShowUpload(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
          </div>
        </div>
      )}

      {/* Tabela de músicas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-[#ffe6b3] text-[#1a0d0a]">
              <th className="py-2 px-4">Título</th>
              <th className="py-2 px-4">Artista</th>
              <th className="py-2 px-4">Álbum</th>
              <th className="py-2 px-4">Duração</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Ouvir</th>
              <th className="py-2 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMusics.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-[#c96a2b]">Nenhuma música encontrada.</td>
              </tr>
            )}
            {filteredMusics.map(music => (
              <tr key={music.id} className="border-b border-[#ffe6b3]">
                <td className="py-2 px-4 font-semibold">{music.title}</td>
                <td className="py-2 px-4">{music.artist}</td>
                <td className="py-2 px-4">{music.album}</td>
                <td className="py-2 px-4">{Math.floor(music.duration / 60)}:{(music.duration % 60).toString().padStart(2, '0')}</td>
                <td className="py-2 px-4">{music.is_active ? 'Ativa' : 'Inativa'}</td>
                <td className="py-2 px-4">
                  <button onClick={() => setSelectedMusic(music)} className="text-[#c96a2b] underline">▶️ Ouvir</button>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleEdit(music)} className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">✏️</button>
                  <button onClick={() => handleDelete(music)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">🗑️</button>
                  <button onClick={() => handleAddToPlaylist(music)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">+ Playlist</button>
                  <button onClick={() => handlePlayNow(music)} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Tocar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player embutido */}
      {selectedMusic && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-bold mb-2">Ouvir: {selectedMusic.title}</h2>
            <audio src={selectedMusic.file_url} controls autoPlay className="mb-4" />
            <button onClick={() => setSelectedMusic(null)} className="bg-[#c96a2b] text-white px-4 py-2 rounded hover:bg-[#e63946]">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
} 