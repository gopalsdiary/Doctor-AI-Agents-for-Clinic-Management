import { createClient } from '@/lib/supabase/client';

export const getAISettings = async (clinicId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ai_settings')
    .select('*')
    .eq('clinic_id', clinicId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateAISettings = async (clinicId: string, settings: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ai_settings')
    .upsert({ clinic_id: clinicId, ...settings })
    .select()
    .single();

  if (error) throw error;
  return data;
};
