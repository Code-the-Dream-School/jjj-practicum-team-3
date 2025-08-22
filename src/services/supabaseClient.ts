import { config } from 'dotenv';
config({ path: '.env.local' });  

import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.");
  }

// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);