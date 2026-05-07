import { createBrowserClient as createBaseClient } from "@supabase/ssr";

export const createClient = () =>
  createBaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export const createBrowserClient = createClient;