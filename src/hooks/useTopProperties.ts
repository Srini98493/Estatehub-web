import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export const useTopProperties = () => {
  return useQuery({
    queryKey: ['topProperties'],
    queryFn: async () => {
      const response = await api.get(`${API_ENDPOINTS.MOST_VIEWED_PROPERTIES}?limit=5`);
      console.log(response,"Response");
      
      if (!response.success) {
        throw new Error(response.message);
      }
      return response?.data?.t_properties_get_recent_viewed_favourcnt;
    },
  });
}; 