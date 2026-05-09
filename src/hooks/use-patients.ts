import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPatients, createPatient } from '@/actions/patients';
import { useClinic } from './use-clinic';

export const usePatients = () => {
  const queryClient = useQueryClient();
  const { clinic } = useClinic();

  const patientsQuery = useQuery({
    queryKey: ['patients', clinic?.id],
    queryFn: () => getPatients(clinic!.id),
    enabled: !!clinic?.id,
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  return {
    patients: patientsQuery.data || [],
    isLoading: patientsQuery.isLoading,
    isError: patientsQuery.isError,
    createPatient: createMutation.mutateAsync,
  };
};
