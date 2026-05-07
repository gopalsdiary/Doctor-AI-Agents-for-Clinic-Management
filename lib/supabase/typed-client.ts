import { createClient as createBaseClient } from "./client";
import { Database } from "@/types/supabase";

export const createClient = () => createBaseClient<Database>();