import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export interface Booking {
  area: string;
  city: string;
  price: string;
  state: string;
  expiry: string | null;
  status: string;
  userid: number;
  address: string;
  country: string;
  pincode: string;
  bedrooms: number;
  isactive: boolean;
  isbooked: boolean;
  landmark: string;
  latitude: string;
  amenities: string; // Consider parsing this if needed
  bathrooms: number;
  createdby: number;
  longitude: string;
  updatedby: number;
  bookeddate: string;
  isapproved: boolean;
  propertyid: number;
  createddate: string;
  iscancelled: boolean;
  updateddate: string;
  cancelleddate: string | null;
  propertybookingid: number;
  reasonforcancellation: string;
  propertytitle: string;
  generallocation: string;
  propertycategory: number;
  propertydescription: string;
  attachments: Array<{
    isprimary: boolean;
    attachmentid: number;
    attachmenturl: string;
    attachmentname: string;
    attachmenttype: number;
  }>;
}

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings, ...queryInfo } = useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.GET_USER_BOOKINGS);
      return response?.t_propertybooking_get_by_id;
    },
  });

  const cancelBooking = useMutation({
    mutationFn: async ({ propertyId, bookingId, reasonForCancellation }: { propertyId: number; bookingId: number; reasonForCancellation: string }) => {
      const response = await api.put(API_ENDPOINTS.CANCEL_BOOKING(propertyId, bookingId), {
        isBooked: false,
        isCancelled: true,
        reasonForCancellation,
        bookedDate: new Date().toISOString(),
        cancelledDate: new Date().toISOString(),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });

  return { bookings, cancelBooking, ...queryInfo };
};