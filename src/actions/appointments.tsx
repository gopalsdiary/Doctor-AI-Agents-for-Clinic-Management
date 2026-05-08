import { createClient } from '@/lib/supabase/client';

export const getAppointments = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:patients(name),
      service:services(name)
    `)
    .order('start_time', { ascending: true });

  if (error) throw error;
  return data;
};

export const createAppointment = async (appointment: any) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
