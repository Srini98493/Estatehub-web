import React from 'react';
import { Property } from '../../types';
import { PropertyListItem } from './PropertyListItem';

interface PropertyGridProps {
  properties: Property[];
  title: string;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, title }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <PropertyListItem key={property.propertyid} property={property} onEdit={() => {}} />
        ))}
      </div>
    </div>
  );
};