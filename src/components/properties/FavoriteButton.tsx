import React from 'react';
import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { API_ENDPOINTS } from '../../config/api';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';

interface FavoriteButtonProps {
  propertyId: number;
  isFavorite?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  propertyId,
  isFavorite = false 
}) => {
  const queryClient = useQueryClient();
  const { user, toggleLoginModal } = useAuthStore();

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      const response = await api.post(API_ENDPOINTS.FAVORITES, {
        propertyId,
        userId: user?.userid,
        rating: 0,
        comment: ''
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    },
    onError: () => {
      toast.error('Failed to update favorites');
    }
  });

  return (
    <Button
      onClick={(e) => {e.stopPropagation(); if (!user) {toggleLoginModal(true)} else {toggleFavorite()}}}
      variant={isFavorite ? 'primary' : 'secondary'}
      size="sm"
      className={`p-2 rounded-full ${
        isFavorite 
          ? '!bg-red-500 hover:!bg-red-600' 
          : 'bg-white hover:text-red-500'
      }`}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
};
