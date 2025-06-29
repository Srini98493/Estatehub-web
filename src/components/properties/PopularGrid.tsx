import React from 'react';
import { PopularCard } from './PopularCard';
import { useFavorites } from '../../hooks/useFavorites';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  area: string;
  beds: number;
  baths: number;
  popular: boolean;
  currencyType: string;
}

interface PopularGridProps {
  properties: Property[];
  title?: string;
}

export const PopularGrid: React.FC<PopularGridProps> = ({ properties, title }) => {
  const { favorites } = useFavorites();

  return (
    <div>
      {title && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <PopularCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 