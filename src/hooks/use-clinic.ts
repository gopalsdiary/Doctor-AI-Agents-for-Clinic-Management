import { useQuery } from '@tanstack/react-query';
import { getClinic } from '@/actions/clinic';

export const useClinic = () => {
  const clinicQuery = useQuery({
    queryKey: ['clinic'],
    queryFn: getClinic,
  });

  return {
    clinic: clinicQuery.data,
    isLoading: clinicQuery.isLoading,
    isError: clinicQuery.isError,
  };
};
