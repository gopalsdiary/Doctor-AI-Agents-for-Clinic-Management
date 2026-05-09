import { createClient } from '@/lib/supabase/client';

export const getServices = async (clinicId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('clinic_id', clinicId)
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

export const createService = async (service: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single();

  if (error) throw error;
  return data;
};
