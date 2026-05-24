// backend/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ttjorlieygyiqsjynsjy.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDA2NDgxNiwiZXhwIjoyMDY5NjQwODE2fQ.X5pmKgVZFrjHHX_Jlmx6k5bEhcObadCwsgRJ47UGQxg'; // Service role key only used on backend

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;
