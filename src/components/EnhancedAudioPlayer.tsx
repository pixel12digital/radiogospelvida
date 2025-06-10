'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase, type RadioStatus } from '@/lib/supabase'
import { Play, Pause, Volume2, Radio } from 'lucide-react'

interface EnhancedAudioPlayerProps {
  streamUrl: string
  stationName: string
}

export default function EnhancedAudioPlayer({ streamUrl, stationName }: EnhancedAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [radioStatus, setRadioStatus] = useState<RadioStatus | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    // Carregar status inicial
    loadRadioStatus()

    // Atualizar status a cada 5 segundos
    const interval = setInterval(loadRadioStatus, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadRadioStatus = async () => {
    try {
      const { data } = await supabase
        .from('radio_status')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (data && data[0]) {
        setRadioStatus(data[0])
      }
    } catch (error) {
      console.error('Erro ao carregar status:', error)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setIsLoading(false)
      }).catch((error) => {
        console.error('Erro ao reproduzir áudio:', error)
        setIsLoading(false)
      })
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleAudioError = () => {
    setIsPlaying(false)
    setIsLoading(false)
    alert('Erro ao carregar o stream de áudio. Verifique a URL.')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header com Status */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Radio className="mr-2 text-blue-600" size={24} />
          <h1 className="text-3xl font-bold text-gray-800">{stationName}</h1>
        </div>
        <p className="text-gray-600">Rádio Online</p>
        
        {/* Status da Rádio */}
        {radioStatus && (
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${radioStatus.is_live ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="font-medium text-sm">
                {radioStatus.is_live ? '🔴 AO VIVO' : '⚫ OFFLINE'}
              </span>
            </div>
            
            {radioStatus.dj_name && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">DJ:</span> {radioStatus.dj_name}
              </p>
            )}
            
            {radioStatus.show_name && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Programa:</span> {radioStatus.show_name}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Player Controls */}
      <div className="flex justify-center mb-6">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} />
          )}
        </button>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Volume2 className="mr-2 text-gray-600" size={16} />
          <label className="block text-sm font-medium text-gray-700">
            Volume: {Math.round(volume * 100)}%
          </label>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Status do Player */}
      <div className="text-center text-sm text-gray-500">
        {isPlaying ? '🎵 Tocando agora...' : 'Clique para ouvir'}
      </div>

      {/* Informações Adicionais */}
      {radioStatus && radioStatus.is_live && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 text-center">
            🎙️ Transmissão ao vivo em andamento
          </p>
        </div>
      )}

      <audio
        ref={audioRef}
        src={streamUrl}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        preload="none"
      />
    </div>
  )
} 