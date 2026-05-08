import { createClient as createBaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createBaseClient<Database>(supabaseUrl, supabaseAnonKey);

// For backward compatibility if needed, but we should migrate to using 'supabase' directly
export const createClient = () => supabase;
export const createBrowserClient = createClient;
