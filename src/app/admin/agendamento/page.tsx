'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AgendamentoPage() {
  const [playlists, setPlaylists] = useState<any[]>([])
  const [selected, setSelected] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [agendamentos, setAgendamentos] = useState<any[]>([])

  useEffect(() => {
    fetchPlaylists()
    fetchAgendamentos()
  }, [])

  const fetchPlaylists = async () => {
    const { data } = await supabase.from('playlists').select('*').order('name')
    if (data) setPlaylists(data)
  }
  const fetchAgendamentos = async () => {
    const { data } = await supabase.from('agendamentos').select('*').order('data_hora', { ascending: true })
    if (data) setAgendamentos(data)
  }

  const handleAgendar = async () => {
    if (!selected || !date || !time) return
    const data_hora = `${date}T${time}`
    const { error } = await supabase.from('agendamentos').insert({ playlist_id: selected, data_hora })
    if (!error) {
      setSelected('')
      setDate('')
      setTime('')
      fetchAgendamentos()
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a0d0a] mb-6">Agendamento de Playlists</h1>
      <div className="bg-[#fff3e6] p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4 items-end">
        <select value={selected} onChange={e => setSelected(e.target.value)} className="px-3 py-2 rounded w-full md:w-64 border border-[#c96a2b] text-[#1a0d0a]">
          <option value="">Selecione uma playlist</option>
          {playlists.map((pl) => (
            <option key={pl.id} value={pl.id}>{pl.name}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-2 rounded border border-[#c96a2b] text-[#1a0d0a]" />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="px-3 py-2 rounded border border-[#c96a2b] text-[#1a0d0a]" />
        <button onClick={handleAgendar} className="bg-[#c96a2b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e63946] transition">Agendar</button>
      </div>
      <h2 className="text-xl font-semibold text-[#c96a2b] mb-4">Próximos Agendamentos</h2>
      <ul className="bg-[#fff3e6] rounded-lg p-4">
        {agendamentos.length === 0 && <li className="text-[#1a0d0a]">Nenhum agendamento.</li>}
        {agendamentos.map((ag) => (
          <li key={ag.id} className="text-[#1a0d0a] border-b border-[#c96a2b] py-2">
            <span className="font-semibold">{playlists.find(p => p.id === ag.playlist_id)?.name || 'Playlist'}</span>
            <span className="ml-4 text-sm">{new Date(ag.data_hora).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 