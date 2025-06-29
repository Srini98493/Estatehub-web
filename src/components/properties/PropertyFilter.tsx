import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '../common/Button';

export type PropertyType = 'all' | 'apartment' | 'hotel' | 'Individual Villa / House' | 'cottage';
export type ViewType = 'grid' | 'list';

interface PropertyFilterProps {
  selectedType: PropertyType;
  viewType: ViewType;
  onTypeChange: (type: PropertyType) => void;
  onViewChange: (view: ViewType) => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  selectedType,
  viewType,
  onTypeChange,
  onViewChange,
}) => {
  return (
    <div className="flex flex-row justify-between rounded-lg mb-6">

      {/* Property Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          onClick={() => onTypeChange('all')}
          variant={selectedType === 'all' ? 'gradient' : 'secondary'}
          size="sm"
          className="whitespace-nowrap"
        >
          All
        </Button>
        <Button
          onClick={() => onTypeChange('Individual House / Villa')}
          variant={selectedType === 'Individual House / Villa' ? 'gradient' : 'secondary'}
          size="sm"
          className="whitespace-nowrap"
        >
          Individual House / Villa
        </Button>
        <Button
          onClick={() => onTypeChange('Apartment')}
          variant={selectedType === 'Apartment' ? 'gradient' : 'secondary'}
          size="sm"
          className="whitespace-nowrap"
        >
          Apartment
        </Button>
        <Button
          onClick={() => onTypeChange('Agriculture Land')}
          variant={selectedType === 'Agriculture Land' ? 'gradient' : 'secondary'}
          size="sm"
          className="whitespace-nowrap"
        >
          Agriculture Land
        </Button>
        <Button
          onClick={() => onTypeChange('Open Plot')}
          variant={selectedType === 'Open Plot' ? 'gradient' : 'secondary'}
          size="sm"
          className="whitespace-nowrap"
        >
          Open Plot
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-lg font-semibold text-gray-900">Property Types</h2> */}
        {/* <div className="flex gap-2">
          <Button
            onClick={() => onViewChange('grid')}
            variant={viewType === 'grid' ? 'gradient' : 'secondary'}
            size="sm"
            className="p-2"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => onViewChange('list')}
            variant={viewType === 'list' ? 'gradient' : 'secondary'}
            size="sm"
            className="p-2"
          >
            <List className="h-5 w-5" />
          </Button>
        </div> */}
      </div>
    </div>
  );
};