import { createClient } from '@supabase/supabase-js'

// These values come from your Supabase dashboard (Project settings → API)
const supabaseUrl = 'https://ttjorlieygyiqsjynsjy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjQ4MTYsImV4cCI6MjA2OTY0MDgxNn0.JFKUIND5m7RtYLHStWqXoI6bM60UxSPIsfdBakVWWCA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
