import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Music {
  id: number
  title: string
  artist: string
  album?: string
  duration: number
  file_url: string
  created_at: string
  is_active: boolean
}

export interface Playlist {
  id: number
  name: string
  description?: string
  created_at: string
  is_active: boolean
}

export interface PlaylistMusic {
  id: number
  playlist_id: number
  music_id: number
  order_index: number
  created_at: string
}

export interface RadioStatus {
  id: number
  is_live: boolean
  current_music_id?: number
  current_playlist_id?: number
  dj_name?: string
  show_name?: string
  created_at: string
  updated_at: string
} 