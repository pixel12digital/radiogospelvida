'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function compartilhar() {
    if (navigator.share) {
      navigator.share({
        title: 'Rádio Gospel Vida',
        text: 'Ouça a melhor rádio gospel online!',
        url: window.location.href,
      });
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  }

  return (
    <header className="w-full bg-[#1a0d0a] text-[#ffe6b3] shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-10 h-10 flex items-center justify-center text-[#ffe6b3] p-0">
            {/* Microfone SVG Heroicon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="none" />
              <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="2" />
              <path d="M19 11v1a7 7 0 0 1-14 0v-1" stroke="currentColor" strokeWidth="2" />
              <path d="M12 19v3m0 0h4m-4 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-bold text-lg hidden sm:inline">Rádio Gospel Vida</span>
        </Link>
        {/* Botão de compartilhamento com indicativo */}
        <button
          className="ml-2 flex items-center gap-2 p-2 rounded-full hover:bg-[#a85b1a]/30 focus:outline-none focus:ring-2 focus:ring-[#a85b1a]"
          onClick={compartilhar}
          aria-label="Compartilhar rádio"
        >
          {/* Ícone de compartilhamento */}
          <svg width="28" height="28" fill="none" stroke="#ffe6b3" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
          </svg>
          <span className="font-semibold text-[#ffe6b3]">Compartilhe!</span>
        </button>
        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 font-semibold">
          {/* Nenhum item de menu */}
        </nav>
        {/* Botão menu mobile */}
        <button className="md:hidden ml-2" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          <svg width="32" height="32" fill="none" stroke="#ffe6b3" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden bg-[#1a0d0a] border-t border-[#a85b1a] flex flex-col gap-4 px-6 py-4 animate-fade-in-down">
          {/* Nenhum item de menu */}
        </nav>
      )}
    </header>
  );
} 