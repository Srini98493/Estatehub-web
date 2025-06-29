import React from 'react';
import { FavoriteCard } from './FavoriteCard';
import { Property } from '../../types';

interface FavoritesListProps {
  properties: Property[];
  isLoading: boolean;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ properties, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No favorite properties yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <FavoriteCard key={property.id} property={property} />
      ))}
    </div>
  );
};