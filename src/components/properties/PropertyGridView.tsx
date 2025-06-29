import React from 'react';
import { Property } from '../../types';
import { PropertyCard } from './PropertyCard';

interface PropertyGridViewProps {
  properties: Property[];
  title: string;
}

export const PropertyGridView: React.FC<PropertyGridViewProps> = ({ properties, title }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <PropertyCard key={property.propertyid} property={property} />
        ))}
      </div>
    </div>
  );
}; 