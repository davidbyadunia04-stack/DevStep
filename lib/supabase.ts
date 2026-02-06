import { createClient } from '@supabase/supabase-js'

// Les clés que tu trouves dans Supabase > Settings > API
const supabaseUrl = 'https://TON_PROJET_ID.supabase.co'
const supabaseAnonKey = 'TON_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)