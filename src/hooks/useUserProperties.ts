import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { useAuthStore } from '../store/authStore';

export const useUserProperties = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['userProperties', user?.userid],
    queryFn: async () => {
      const response = await api.post(`${API_ENDPOINTS.GET_PROPERTIES_BY_USERID}`, {
        userId: user?.userid,
        full: "1"
      });

      // Handle the case when no properties are found
      if (!response.t_propertydetails_get_by_id) {
        return [];
      }

      return response.t_propertydetails_get_by_id;
    },
    enabled: !!user?.userid, // Only fetch if user is logged in
  });
}; 