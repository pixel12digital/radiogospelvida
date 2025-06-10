'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  streamUrl: string
  stationName: string
}

export default function AudioPlayer({ streamUrl, stationName }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

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
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{stationName}</h1>
        <p className="text-gray-600">Rádio Online</p>
      </div>

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
            '⏸️'
          ) : (
            '▶️'
          )}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volume: {Math.round(volume * 100)}%
        </label>
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

      <div className="text-center text-sm text-gray-500">
        {isPlaying ? '🎵 Tocando agora...' : 'Clique para ouvir'}
      </div>

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