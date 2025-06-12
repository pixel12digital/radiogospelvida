'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    })
    // Listen for logout/login events
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace('/login')
      }
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-[#a85b1a] text-xl">Carregando...</div>
  }

  return (
    <div className="flex min-h-screen bg-[#fff8f0]">
      {/* Menu lateral */}
      <aside className="w-72 bg-white text-[#a85b1a] flex flex-col items-center py-8 shadow-lg border-r border-[#ffe6b3]">
        <div className="mb-10">
          <Image src="/logo.png" alt="Logo Rádio Gospel Vida" width={100} height={100} className="rounded-full border-4 border-[#a85b1a] shadow-lg" />
        </div>
        <nav className="flex flex-col gap-3 w-full px-4">
          <Link href="/admin" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Dashboard</Link>
          <Link href="/admin/musicas" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Músicas</Link>
          <Link href="/admin/playlists" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Playlists</Link>
          <Link href="/admin/programacao" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Programação</Link>
          <Link href="/admin/pedidos" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Pedidos</Link>
          <Link href="/admin/recados" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Recados</Link>
          <Link href="/admin/historico" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Histórico</Link>
          <Link href="/admin/equipe" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Equipe</Link>
          <Link href="/admin/noticias" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Notícias</Link>
          <Link href="/admin/patrocinadores" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Patrocinadores</Link>
          <Link href="/admin/configuracoes" className="py-3 px-4 rounded-lg hover:bg-[#ffe6b3] hover:text-[#1a0d0a] font-semibold transition">Configurações</Link>
          <div className="flex-1" />
          <button onClick={handleLogout} className="py-3 px-4 rounded-lg bg-[#e63946] text-white font-semibold mt-8 w-full hover:bg-red-700 transition">Sair</button>
        </nav>
      </aside>
      {/* Conteúdo principal */}
      <main className="flex-1 p-8 bg-[#fff8f0] min-h-screen">
        {children}
      </main>
    </div>
  )
} 