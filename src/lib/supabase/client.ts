import { createClient as createBaseClient } from "@supabase/supabase-js";

export const createClient = () =>
  createBaseClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );

export const createBrowserClient = createClient;
