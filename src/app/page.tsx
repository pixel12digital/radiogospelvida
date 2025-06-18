'use client'

import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#2d1407] to-[#a85b1a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1a0d0a]/80 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <div className="w-56 h-56 flex items-center justify-center mb-6 rounded-full border-4 border-[#a85b1a] shadow-lg bg-[#fff3e6]/10 overflow-hidden">
          <Image
            src="/images/logo.webp"
            alt="Logo Rádio Gospel Vida"
            width={208}
            height={208}
            className="object-cover rounded-full"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#ffe6b3] mb-2 text-center drop-shadow">Rádio Gospel Vida <span className="text-red-500">♥</span></h1>
        <p className="text-[#ffe6b3] text-center mb-6">Bem-vindo à sua rádio gospel online!<br/> Louvor, adoração e palavra 24h no ar.</p>
        {/* Player central */}
        <div className="w-full flex flex-col items-center mb-6">
          <iframe 
            src="https://painel.radioweb.app.br/public/gospel-vida/embed?theme=light" 
            frameBorder="0" 
            allowTransparency={true} 
            style={{ width: '100%', minHeight: '150px', border: 0 }}
            title="Rádio Gospel Vida Player"
          />
          <span className="text-[#ffe6b3] mt-2">Clique no play para ouvir ao vivo</span>
        </div>
        {/* Destaque programação */}
        <div className="bg-[#a85b1a]/80 rounded-lg p-4 w-full text-center mb-4">
          <span className="text-[#ffe6b3] font-semibold">Próxima programação:</span>
          <div className="text-[#fff3e6]">Fique ligado! Em breve, nova programação ao vivo na Rádio Gospel Vida.</div>
        </div>
        {/* Versículo do dia */}
        <div className="bg-[#ffe6b3]/80 rounded-lg p-4 w-full text-center">
          <span className="text-[#a85b1a] font-semibold">Versículo do dia:</span>
          <div className="text-[#1a0d0a] italic">&quot;O Senhor é o meu pastor, nada me faltará.&quot; (Salmo 23:1)</div>
        </div>
      </div>
      {/* Rodapé */}
      <footer className="mt-8 text-[#ffe6b3] text-center text-sm opacity-80">
        © {new Date().getFullYear()} Rádio Gospel Vida. Todos os direitos reservados.
      </footer>
    </main>
  );
} 