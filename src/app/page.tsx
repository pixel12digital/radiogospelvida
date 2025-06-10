import EnhancedAudioPlayer from '@/components/EnhancedAudioPlayer'

export default function Home() {
  // URL de exemplo de uma rádio online (você pode alterar para qualquer stream válido)
  const streamUrl = 'https://stream.radiojar.com/4ywdgup3bnzuv'
  const stationName = 'Rádio Web'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <EnhancedAudioPlayer streamUrl={streamUrl} stationName={stationName} />
        
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>🎵 Sua rádio online favorita</p>
          <p className="mt-2">
            <a href="/admin" className="text-blue-600 hover:text-blue-800 underline">
              🎙️ Painel do DJ
            </a>
          </p>
        </div>
      </div>
    </main>
  )
} 