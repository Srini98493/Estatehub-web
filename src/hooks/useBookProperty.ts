import { useMutation } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

interface BookPropertyPayload {
  bookedDate: string;
  cancelledDate: null;
  isBooked: boolean;
  isCancelled: boolean;
  reasonForCancellation: string;
}

interface BookPropertyResponse {
  success: boolean;
  message: string;
  data: {
    t_propertybooking_insert: number;
  };
}

export const useBookProperty = () => {
  return useMutation({
    mutationFn: async ({ 
      propertyId, 
      bookingData 
    }: { 
      propertyId: string | number; 
      bookingData: BookPropertyPayload 
    }) => {
      const response = await api.post(
        API_ENDPOINTS.BOOK_PROPERTY(propertyId),
        bookingData
      );
      return response as BookPropertyResponse;
    },
  });
}; 