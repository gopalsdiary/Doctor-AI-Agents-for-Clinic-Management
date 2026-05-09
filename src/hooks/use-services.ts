import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServices, createService } from '@/actions/services';
import { useClinic } from './use-clinic';

export const useServices = () => {
  const queryClient = useQueryClient();
  const { clinic } = useClinic();

  const servicesQuery = useQuery({
    queryKey: ['services', clinic?.id],
    queryFn: () => getServices(clinic!.id),
    enabled: !!clinic?.id,
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  return {
    services: servicesQuery.data || [],
    isLoading: servicesQuery.isLoading,
    isError: servicesQuery.isError,
    createService: createMutation.mutateAsync,
  };
};
