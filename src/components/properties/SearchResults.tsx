import React from 'react';
import { PropertyCard } from './PropertyCard';

interface SearchResultsProps {
  properties?: any[]; // Update this type based on your property interface
}

export const SearchResults: React.FC<SearchResultsProps> = ({ properties = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {properties.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          No properties found matching your criteria
        </div>
      )}
    </div>
  );
}; 