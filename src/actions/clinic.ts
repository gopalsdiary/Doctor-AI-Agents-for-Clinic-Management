import { createClient } from '@/lib/supabase/client';

export const getClinic = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('clinics')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateClinic = async (clinic: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('clinics')
    .upsert(clinic)
    .select()
    .single();

  if (error) throw error;
  return data;
};
