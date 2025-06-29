import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Property } from '../../types';
import { usePropertyMutations } from '../../hooks/useProperties';
import { useNavigate, useLocation } from 'react-router-dom';
import { PLACEHOLDER_IMAGES } from '../../constants/images';
import { toast } from 'react-hot-toast';
import ConfirmationPopup from '../common/ConfirmationPopup';

interface MyPropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete?: (propertyId: number) => void;
}

export const MyPropertyCard: React.FC<MyPropertyCardProps> = ({
  property,
  onEdit,
  onDelete
}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { deleteProperty } = usePropertyMutations();

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProperty(property.propertyid);
    toast.success("Property deleted successfully");
  };

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/properties/${property.propertyid}`, {
      state: { from: location.pathname }
    });
  };

  const propertyImage = property.attachments && property.attachments.length > 0
    ? property.attachments.find(att => att.isprimary)?.attachmenturl
    : PLACEHOLDER_IMAGES.PROPERTY;
    // console.log('Property Image:', propertyImage.property); // Debugging line
  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 md:h-auto">
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
            <div className="flex justify-between items-start">
              <div>
                {!property.isapproved && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full mb-2">
                    Awaiting Approval
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{property.propertytitle}</h3>
                <p className="text-gray-600 mt-1">{property.address}</p>
                <div className="flex gap-2 text-sm text-gray-600 mb-2">
                  {(property.propertytype.toLowerCase() !== 'open plot' && property.propertytype.toLowerCase() !== 'agriculture land' && property.bedrooms !== undefined) && (
                    <>
                      <span>{property.bedrooms} BHK</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{property.propertytype}</span>
                  <span>•</span>
                  <span>{property.city}</span>
                </div>
              </div>

              {/* Edit and Delete Buttons */}
              <div className="flex gap-2">
                {/* Check if property is not approved before showing edit and delete buttons */}
                {!property.isapproved && (
                  <>
                    <button
                      onClick={(e) => {
                        console.log('Edit button clicked', property); // Debug: log the property
                        onEdit(property);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Property"
                    >
                      <Edit className="h-5 w-5" />
                    </button>

                    {onDelete && (
                      <button
                        onClick={() => setPopupOpen(true)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </>
                )}
              </div>
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
        </div>
      </div>

      {/* Confirmation Popup */}
      {<ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this property ?"
        subdescription="This action cannot be undone."
      />}
    </div>
  );
};