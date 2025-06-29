import React from 'react';
import { MyPropertyCard } from './MyPropertyCard';
import { Property } from '../../types';

interface MyPropertyListProps {
  properties: Property[];
  isLoading: boolean;
  onEdit: (property: Property) => void;
  onDelete?: (propertyId: number) => void;
}

export const MyPropertyList: React.FC<MyPropertyListProps> = ({ 
  properties, 
  isLoading,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <MyPropertyCard 
          key={property.propertyid} 
          property={property} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};