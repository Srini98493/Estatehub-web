import React from 'react';
import { Property } from '../../types';
import { PropertyListItem } from './PropertyListItem';

interface PropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  isLoading: boolean;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, onEdit, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {properties?.map((property) => (
        <PropertyListItem key={property.id} property={property} onEdit={() => onEdit(property)} />
      ))}
    </div>
  );
};