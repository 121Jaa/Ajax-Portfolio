import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL atau Anon Key tidak ditemukan. Cek file .env.local kamu."
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)