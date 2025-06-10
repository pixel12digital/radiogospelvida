'use client'

import { useState, useEffect } from 'react'
import { supabase, type Music, type Playlist, type RadioStatus } from '@/lib/supabase'
import { Play, Pause, Mic, Music as MusicIcon, List, Plus, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RadioManager() {
  const [isLive, setIsLive] = useState(false)
  const [currentMusic, setCurrentMusic] = useState<Music | null>(null)
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [musics, setMusics] = useState<Music[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [djName, setDjName] = useState('')
  const [showName, setShowName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Carregar músicas
      const { data: musicsData } = await supabase
        .from('musics')
        .select('*')
        .eq('is_active', true)
        .order('title')

      // Carregar playlists
      const { data: playlistsData } = await supabase
        .from('playlists')
        .select('*')
        .eq('is_active', true)
        .order('name')

      // Carregar status atual
      const { data: statusData } = await supabase
        .from('radio_status')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (musicsData) setMusics(musicsData)
      if (playlistsData) setPlaylists(playlistsData)
      if (statusData && statusData[0]) {
        const status = statusData[0]
        setIsLive(status.is_live)
        setDjName(status.dj_name || '')
        setShowName(status.show_name || '')
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar dados')
    }
  }

  const toggleLive = async () => {
    setIsLoading(true)
    try {
      const newStatus = !isLive
      setIsLive(newStatus)

      const { error } = await supabase
        .from('radio_status')
        .insert({
          is_live: newStatus,
          dj_name: djName,
          show_name: showName,
          current_music_id: currentMusic?.id,
          current_playlist_id: currentPlaylist?.id
        })

      if (error) throw error

      toast.success(newStatus ? '🎙️ Transmissão ao vivo iniciada!' : '⏹️ Transmissão finalizada')
    } catch (error) {
      console.error('Erro ao alterar status:', error)
      toast.error('Erro ao alterar status')
      setIsLive(!isLive) // Reverter estado
    } finally {
      setIsLoading(false)
    }
  }

  const playMusic = async (music: Music) => {
    setIsLoading(true)
    try {
      setCurrentMusic(music)
      setCurrentPlaylist(null)

      const { error } = await supabase
        .from('radio_status')
        .insert({
          is_live: isLive,
          dj_name: djName,
          show_name: showName,
          current_music_id: music.id
        })

      if (error) throw error

      toast.success(`🎵 Tocando: ${music.title} - ${music.artist}`)
    } catch (error) {
      console.error('Erro ao tocar música:', error)
      toast.error('Erro ao tocar música')
    } finally {
      setIsLoading(false)
    }
  }

  const playPlaylist = async (playlist: Playlist) => {
    setIsLoading(true)
    try {
      setCurrentPlaylist(playlist)
      setCurrentMusic(null)

      const { error } = await supabase
        .from('radio_status')
        .insert({
          is_live: isLive,
          dj_name: djName,
          show_name: showName,
          current_playlist_id: playlist.id
        })

      if (error) throw error

      toast.success(`📀 Tocando playlist: ${playlist.name}`)
    } catch (error) {
      console.error('Erro ao tocar playlist:', error)
      toast.error('Erro ao tocar playlist')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎙️ Painel do DJ</h1>
        <p className="text-gray-600">Gerencie sua rádio online</p>
      </div>

      {/* Status e Controles */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="font-medium">
              {isLive ? '🔴 AO VIVO' : '⚫ OFFLINE'}
            </span>
          </div>
          <button
            onClick={toggleLive}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isLive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Carregando...' : isLive ? 'Finalizar' : 'Iniciar Transmissão'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do DJ
            </label>
            <input
              type="text"
              value={djName}
              onChange={(e) => setDjName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Seu nome artístico"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Programa
            </label>
            <input
              type="text"
              value={showName}
              onChange={(e) => setShowName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nome do seu programa"
            />
          </div>
        </div>
      </div>

      {/* Músicas */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MusicIcon className="mr-2" />
          Músicas Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {musics.map((music) => (
            <div
              key={music.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => playMusic(music)}
            >
              <h3 className="font-medium text-gray-800 truncate">{music.title}</h3>
              <p className="text-sm text-gray-600 truncate">{music.artist}</p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(music.duration / 60)}:{(music.duration % 60).toString().padStart(2, '0')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <List className="mr-2" />
          Playlists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => playPlaylist(playlist)}
            >
              <h3 className="font-medium text-blue-800">{playlist.name}</h3>
              <p className="text-sm text-blue-600">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Atual */}
      {(currentMusic || currentPlaylist) && (
        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">🎵 Tocando Agora:</h3>
          {currentMusic && (
            <p className="text-green-700">
              {currentMusic.title} - {currentMusic.artist}
            </p>
          )}
          {currentPlaylist && (
            <p className="text-green-700">
              Playlist: {currentPlaylist.name}
            </p>
          )}
        </div>
      )}
    </div>
  )
} 