import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';
import { useAuthStore } from '../store/authStore';

export const useProperty = () => {

  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['properties', user?.userid],
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

export const usePropertyMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const response = await api.delete(API_ENDPOINTS.DELETE_PROPERTY(propertyId));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties', ] });
    },
  });

  return {
    deleteProperty: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};