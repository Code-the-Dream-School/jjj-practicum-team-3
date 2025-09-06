//removing dotenv and .env.local since Next.js automatically loads both
// import { config } from 'dotenv';
// config({ path: '.env.local' });  

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing environment variables.')
  }

// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);