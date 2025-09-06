import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Ensure environment variables exist at compile time
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
