'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 font-semibold">
          <Link href="/programacao" className="hover:text-[#a85b1a] transition">Programação</Link>
          <Link href="/pedidos" className="hover:text-[#a85b1a] transition">Pedidos</Link>
          <Link href="/recados" className="hover:text-[#a85b1a] transition">Recados</Link>
          <Link href="/login" className="hover:text-[#a85b1a] transition">Acessar</Link>
        </nav>
        {/* Botão menu mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          <svg width="32" height="32" fill="none" stroke="#ffe6b3" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden bg-[#1a0d0a] border-t border-[#a85b1a] flex flex-col gap-4 px-6 py-4 animate-fade-in-down">
          <Link href="/programacao" className="hover:text-[#a85b1a] transition" onClick={() => setOpen(false)}>Programação</Link>
          <Link href="/pedidos" className="hover:text-[#a85b1a] transition" onClick={() => setOpen(false)}>Pedidos</Link>
          <Link href="/recados" className="hover:text-[#a85b1a] transition" onClick={() => setOpen(false)}>Recados</Link>
          <Link href="/login" className="hover:text-[#a85b1a] transition" onClick={() => setOpen(false)}>Acessar</Link>
        </nav>
      )}
    </header>
  );
} 