import React from 'react';
import { Check } from 'lucide-react';
import { Property } from '../../types';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { useNavigate } from 'react-router-dom';

interface ApprovalPropertyCardProps {
  property: Property;
  onApprove: (propertyId: number) => void;
}

export const ApprovalPropertyCard: React.FC<ApprovalPropertyCardProps> = ({
  property,
  onApprove
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on approve/reject buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/properties/${property.propertyid}`, {
      state: { from: location.pathname },
    });
  };

  const propertyImage = property.attachments?.find(att => att.isprimary)?.attachmenturl
    || PLACEHOLDER_IMAGES.PROPERTY;
  // console.log('Property Image:', propertyImage); // Debugging line
  const formatPrice = (price: string) => {
    return price.replace(/^\$/, '').replace(/\.00$/, '');
  };

  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-48 md:h-auto">
            {/* <img
              src={propertyImage}
              alt={property.propertytitle}
              className="w-full h-full object-cover"
            /> */}
            {propertyImage && propertyImage !== PLACEHOLDER_IMAGES.PROPERTY ? (
              <img
                src={propertyImage}
                alt={property?.propertytitle || 'Property image'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-center p-4">
                No image uploaded
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mb-2">
                  Pending Approval
                </span>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{property.propertytitle}</h3>
                <p className="text-gray-600 mt-1 truncate">{property.address}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  {property.propertytype?.toLowerCase() !== 'open plot' && property.propertytype?.toLowerCase() !== 'agriculture land' && property.bedrooms !== undefined && (
                    <>
                      <span>{property.bedrooms} BHK</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{property.propertytype}</span>
                  <span>•</span>
                  <span>{property.city}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span>Posted by: {property.postedby}</span>
                  <span className="mx-2">•</span>
                  <span>Category: {property.propertycategoryname}</span>
                </div>
                <div className="mt-2">
                  <span className="text-lg font-semibold text-blue-600">
                    {property.currencytype} {property.price.toLocaleString()}
                  </span>
                </div>
                <p
                  className="mt-4 text-gray-600 line-clamp-2 w-full max-w-screen-lg"
                  style={{
                    overflowWrap: 'break-word',   // Ensure long words break and wrap
                    wordWrap: 'break-word',       // Fallback for older browsers
                    whiteSpace: 'normal',         // Ensures normal text wrapping
                  }}>
                  {property.propertydescription}
                </p>

              </div>

              <div className="self-center">
                <button
                  onClick={() => onApprove(property.propertyid)}
                  className="w-32 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  title="Approve Property"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 