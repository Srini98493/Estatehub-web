import React from 'react';
import { Heart, Bed, Bath } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { useNavigate, useLocation } from 'react-router-dom';

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

interface PopularCardProps {
  property: Property;
  isFavorite?: boolean;
}

export const PopularCard: React.FC<PopularCardProps> = ({ 
  property,
  isFavorite = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/properties/${property?.propertyid}`, {
      state: { from: location.pathname }
    });
  };

  // Determine if the property type is "Open Plot" or "Agriculture Land"
  const isOpenPlotOrAgriculture = property.propertytype === "Open Plot" || property.propertytype === "Agriculture Land";

  // Set the top position based on whether bedrooms and bathrooms are rendered
  const ribbonTopPosition = isOpenPlotOrAgriculture ? '30%' : '40%'; // Adjust these values as needed

  return (
    <div className="relative">
      {/* Main Card */}
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleClick}
      >
        {/* Image Section */}
        <div className="relative w-full h-[150px]">
          <img
            src={property.attachments?.[0]?.attachmenturl || PLACEHOLDER_IMAGES.PROPERTY}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

         {/* Popular Ribbon */}
      <div className={`absolute -left-[8px] top-[${ribbonTopPosition}] z-20`}>
        {/* Main ribbon part */}
        <div 
          className="relative"
          style={{
            width: '113px',
            height: '32px',
          }}
        >
          {/* Background shape */}
          <div 
            className="absolute inset-0 bg-[#1094BF] flex items-center justify-center"
            style={{
              borderRadius: '8px 8px 8px 0',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex items-center gap-1 text-white">
              <span className="text-[#8BE8E5] text-lg">✦</span>
              <span className="text-xs font-medium uppercase tracking-wider">Popular</span>
            </div>
          </div>
          {/* Bottom triangle */}
          <div 
            className="absolute -bottom-2 left-0 w-2 h-2 bg-[#0A7A9F]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)'
            }}
          />
        </div>
      </div>
        
        {/* Content Section */}
        <div className="p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[#4A60A1] text-xl font-semibold"> {property.currencytype} {property.price.toLocaleString()}</span>
              {/* <span className="text-gray-500 text-sm">/month</span> */}
            </div>
            <div className="top-4 right-4 flex items-center justify-center">
              <Heart className="h-6 w-6 fill-red-500 text-gray-100" />
                <span className="ml-1 text-md text-gray-500">{property.favourite_count}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-500 mb-1">{property.propertytitle}</h3>
          <p className="text-gray-500 text-sm mb-3">{property.city}, {property.state}, {property.country}</p>
          
          {(property.propertytype	!== "Agriculture Land" && property.propertytype	!== "Open Plot") &&<div className="h-px bg-gray-200 my-3"/>}
          
          {(property.propertytype	!== "Agriculture Land" && property.propertytype	!== "Open Plot") && <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{property.bathrooms} Bathrooms</span>
            </div>
          </div>}
        </div>
      </div>

    </div>
  );
}; 