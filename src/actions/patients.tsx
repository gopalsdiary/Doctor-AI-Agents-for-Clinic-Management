import { createClient } from '@/lib/supabase/client';

export const getPatients = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

export const createPatient = async (patient: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single();

  if (error) throw error;
  return data;
};
