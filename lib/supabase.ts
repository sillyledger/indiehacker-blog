import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://quqgrjnykheofbirumya.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cWdyam55a2hlb2ZiaXJ1bXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTc2NTYsImV4cCI6MjA5Njg3MzY1Nn0.TOZ7TdeTAfoUyRg09H3cdBr_sUutHyIoW7OSjMh1MTA'

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
