'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<any[]>([])
  const [musics, setMusics] = useState<any[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [selectedMusics, setSelectedMusics] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [editPlaylist, setEditPlaylist] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    fetchPlaylists()
    fetchMusics()
  }, [])

  const fetchPlaylists = async () => {
    const { data } = await supabase.from('playlists').select('*').order('name')
    if (data) setPlaylists(data)
  }
  const fetchMusics = async () => {
    const { data } = await supabase.storage.from('musicas').list('public')
    if (data) setMusics(data)
  }

  const handleCreate = async () => {
    if (!newName) return;
    const { error } = await supabase.from('playlists').insert({
      name: newName,
      description: newDesc,
      is_active: true,
    });
    if (!error) {
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      setErrorMsg('');
      setSuccessMsg('Playlist criada com sucesso!');
      fetchPlaylists();
    } else {
      setErrorMsg(error.message);
      setSuccessMsg('');
    }
  };

  const handleEdit = (playlist: any) => {
    setEditPlaylist(playlist);
    setEditName(playlist.name);
    setEditDesc(playlist.description || '');
  };

  const handleUpdate = async () => {
    if (!editPlaylist) return;
    const { error } = await supabase
      .from('playlists')
      .update({ name: editName, description: editDesc })
      .eq('id', editPlaylist.id);
    if (!error) {
      setEditPlaylist(null);
      fetchPlaylists();
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('playlists').delete().eq('id', id);
    if (!error) {
      fetchPlaylists();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a0d0a] mb-6">Playlists</h1>
      <button onClick={() => setShowCreate(true)} className="bg-[#c96a2b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e63946] transition mb-6">+ Nova Playlist</button>
      {showCreate && (
        <div className="bg-[#fff3e6] p-4 rounded-lg mb-6">
          {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
          {successMsg && <div style={{ color: 'green' }}>{successMsg}</div>}
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nome da playlist" className="mb-2 px-3 py-2 rounded w-full border border-[#c96a2b] text-[#1a0d0a]" />
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Descrição" className="mb-2 px-3 py-2 rounded w-full border border-[#c96a2b] text-[#1a0d0a]" />
          <button onClick={handleCreate} className="bg-[#c96a2b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e63946] transition">Salvar</button>
          <button onClick={() => setShowCreate(false)} className="ml-2 text-[#c96a2b]">Cancelar</button>
        </div>
      )}
      {editPlaylist && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Editar Playlist</h2>
            <input
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="mb-2 px-3 py-2 rounded w-full border border-[#c96a2b] text-[#1a0d0a]"
              placeholder="Nome da playlist"
            />
            <input
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              className="mb-2 px-3 py-2 rounded w-full border border-[#c96a2b] text-[#1a0d0a]"
              placeholder="Descrição"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditPlaylist(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className="bg-[#fff3e6] rounded-lg p-4">
        {playlists.length === 0 && <li className="text-[#1a0d0a]">Nenhuma playlist criada ainda.</li>}
        {playlists.map((pl) => (
          <li key={pl.id} className="text-[#1a0d0a] border-b border-[#c96a2b] py-2 flex items-center justify-between">
            <div>
              <div className="font-semibold">{pl.name}</div>
              <div className="text-sm mb-2">{pl.description}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pl)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pl.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 