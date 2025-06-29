import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Property } from '../../types';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { useBookProperty } from '../../hooks/useBookProperty';
import { useFavorites } from '../../hooks/useFavorites';
import { toast } from 'react-hot-toast';
import { Button } from '../common/Button';
import { useAuthStore } from '../../store/authStore';
import { usePropertyStore } from '../../store/propertyStore';

interface PropertyListItemProps {
  property: Property;
  onEdit: () => void;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({ property, onEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookProperty = useBookProperty();
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const { user, toggleLoginModal } = useAuthStore();
  const userId = user?.userid || 0;
  const { refreshProperties } = usePropertyStore();

  const isFavorite = property?.is_favourite;

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      toggleLoginModal(true);
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFavorite(property.propertyid);
        toast.success('Removed from favorites');
      } else {
        await addFavorite(property.propertyid);
        toast.success('Added to favorites');
      }
      
      refreshProperties();
    } catch (error) {
      console.error('Favorite error:', error);
      toast.error('Failed to update favorites');
    }
  };

  const handleBooking = async (e: React.MouseEvent) => {
    if (!user) {
      toggleLoginModal(true);
      return;
    }
    
    try {
      const bookingData = {
        bookedDate: new Date().toISOString(),
        cancelledDate: null,
        isBooked: true,
        isCancelled: false,
        reasonForCancellation: "",
      };

      await bookProperty.mutateAsync({
        propertyId: property.propertyid,
        bookingData,
      });

      toast.success('Property booked successfully!');
      
      refreshProperties();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book property');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/properties/${property?.propertyid}`, {
        state: { from: location.pathname }
      })}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-72 h-48">
          <img
            src={property.attachments?.find(att => att.isprimary)?.attachmenturl 
              || PLACEHOLDER_IMAGES.PROPERTY}
            alt={property?.propertytitle}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between flex-1">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property?.propertytitle}</h3>
              <div className="flex gap-2 text-sm text-gray-600 mb-2">
                {property.propertytype?.toLowerCase() !== 'open plot' && property.propertytype?.toLowerCase() !== 'agriculture land' && property.bedrooms !== undefined && (
                  <>
                    <span>{property?.bedrooms} BHK</span>
                    <span>•</span>
                  </>
                )}
                <span>{property?.propertytype}</span>
                <span>•</span>
                <span>{property?.city}</span>
              </div>              
              <p 
                className="text-gray-600 line-clamp-2 w-full max-w-screen-lg"
                style={{
                  overflowWrap: 'break-word',   // Ensure long words break and wrap
                  wordWrap: 'break-word',       // Fallback for older browsers
                  whiteSpace: 'normal',         // Ensures normal text wrapping
                }}>
                {property?.propertydescription}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 min-w-[120px] ml-4">
              <Button 
                onClick={property.isbooked ? undefined : (e) => {e.stopPropagation(),handleBooking(property.propertyid)}}
                disabled={property.isbooked || userId == property.createdby}
                fullWidth
              >
                {property.isbooked ? "Booked" : "Book Now"}
              </Button>
              <Button
                onClick={handleFavorite}
                variant={isFavorite ? 'white' : 'secondary'}
                fullWidth
                disabled={userId == property.createdby}
                className={isFavorite ? '!bg-red-50 !text-red-600 hover:!bg-red-100' : ''}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};