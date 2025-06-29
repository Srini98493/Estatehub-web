import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export interface PropertyDetails {
  area: string;
  city: string;
  price: number;
  state: string;
  expiry: string | null;
  status: string;
  userid: number;
  address: string;
  country: string;
  pincode: string;
  bedrooms: number;
  isactive: boolean;
  landmark: string;
  latitude: string;
  amenities: string;
  bathrooms: number;
  longitude: string;
  isapproved: boolean;
  propertyid: number;
  isarchieved: boolean;
  currencytype: string;
  propertytype: number;
  availabledate: string;
  propertytitle: string;
  generallocation: string;
  propertycategory: number;
  propertydescription: string;
}

export interface Favorite {
  favouriteid: number;
  propertyid: number;
  userid: number;
  rating: number;
  comment: string;
  createddate: string;
  updateddate: string;
  property_details: PropertyDetails;
}

interface FavoritePayload {
  rating: number;
  comment: string;
}

export const useFavorites = (enabled: boolean) => {
  const queryClient = useQueryClient();

  const { data: favorites = [], ...queryRest } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      try {
        const response = await api.get(API_ENDPOINTS.FAVORITES);
        if (!response?.data) {
          throw new Error('No data received from favorites endpoint');
        }
        
        return response?.data as Favorite[];
      } catch (error) {
        console.error("Error fetching favorites:", error);
        throw error;
      }
    },
    enabled,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const payload: FavoritePayload = {
        rating: 0,
        comment: ""
      };
      const response = await api.post(API_ENDPOINTS.ADD_FAVORITE(propertyId), payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const updateFavoriteMutation = useMutation({
    mutationFn: async ({ propertyId, payload }: { propertyId: number; payload: FavoritePayload }) => {
      const response = await api.put(API_ENDPOINTS.ADD_FAVORITE(propertyId), payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const response = await api.delete(API_ENDPOINTS.REMOVE_FAVORITE(propertyId));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  return {
    favorites,
    ...queryRest,
    addFavorite: addFavoriteMutation.mutateAsync,
    updateFavorite: updateFavoriteMutation.mutateAsync,
    removeFavorite: removeFavoriteMutation.mutateAsync,
    isAddingFavorite: addFavoriteMutation.isPending,
    isUpdatingFavorite: updateFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
  };
}; 