import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAppointments, createAppointment, updateAppointmentStatus } from '@/actions/appointments';

export const useAppointments = () => {
  const queryClient = useQueryClient();

  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });

  const createMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  return {
    appointments: appointmentsQuery.data || [],
    isLoading: appointmentsQuery.isLoading,
    isError: appointmentsQuery.isError,
    createAppointment: createMutation.mutateAsync,
    updateAppointmentStatus: updateStatusMutation.mutateAsync,
  };
};
