import React from 'react';
import { Heart, Bed, Bath, Square, Edit, Trash } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../common/Button';

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
  isapproved?: boolean;
}

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  showActions?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property,
  isFavorite = false,
  onEdit,
  onDelete,
  showActions = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/properties/${property.propertyid}`, {
      state: { from: location.pathname }
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={property.attachments?.[0]?.attachmenturl || PLACEHOLDER_IMAGES.PROPERTY}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-[#4A60A1] text-xl font-semibold">{property.price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <div className="top-4 right-4">
          <FavoriteButton 
            propertyId={property.id} 
            isFavorite={isFavorite}
          />
        </div>
          {showActions && !property.isapproved && (
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button
                  variant="text"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(property);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="text"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(property);
                  }}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{property.location}</p>
        
        <div className="h-px bg-gray-200 my-3"></div>
        
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{property.baths} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};