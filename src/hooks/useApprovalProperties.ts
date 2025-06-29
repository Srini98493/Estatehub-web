import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export const useApprovalProperties = () => {
  return useQuery({
    queryKey: ['approvalProperties'],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.PENDING_PROPERTIES);
        if (response?.success && response?.data) {
          return response.data;
        }
        return [];
      } catch (error) {
        console.error('Error fetching pending properties:', error);
        return [];
      }
    }
  });
}; 