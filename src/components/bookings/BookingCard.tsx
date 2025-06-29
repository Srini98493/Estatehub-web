import React, { useState } from 'react'; // ✅ Correct import
import { Button } from '../common/Button';
import { Booking, useBookings } from '../../hooks/useBookings';
import { useNavigate } from 'react-router-dom';
// import ContactModel from './components/ContactModel'; // your modal content
import { ContactUsModal } from '../../components/modals/ContactUsModal';
import { CancelConfirmationModal } from '../../components/modals/CancelConfirmationModal'; // add this import

interface BookingCardProps {
  property: Booking;
  bookingDate: string;
  onNavigate: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ property, bookingDate, onNavigate }) => {
  const { cancelBooking } = useBookings();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // <-- add this state
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false); // <-- new state

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation
    const reasonForCancellation = "";
    cancelBooking.mutate({
      propertyId: property.propertyid,
      bookingId: property.propertybookingid,
      reasonForCancellation,
    });
  };

  const handleCancelConfirmed = () => {
    cancelBooking.mutate({
      propertyId: property.propertyid,
      bookingId: property.propertybookingid,
      reasonForCancellation: "",
    });
    setIsCancelConfirmOpen(false); // close modal after confirm
  };
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4">
      <div className="flex flex-col md:flex-row cursor-pointer" onClick={onNavigate}>
        <div className="md:w-72 h-48">
          <img
            src={property.attachments?.find(att => att.isprimary)?.attachmenturl || 'PLACEHOLDER_IMAGE_URL'}
            alt={property.propertytitle}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between h-full">
            <div className="flex-1 pr-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.propertytitle}</h3>
              <div className="flex gap-2 text-sm text-gray-600 mb-2">
                {property?.propertytype?.toLowerCase() !== 'open plot' && property?.propertytype?.toLowerCase() !== 'agriculture land' && (
                  <>
                    <span>{property.bedrooms} BHK</span>
                    <span>•</span>
                  </>
                )}
                <span>{property.propertytype}</span>
                <span>•</span>
                <span>{property.city}</span>
              </div>
              <p className="text-gray-600 line-clamp-2 mb-4">
                {property.propertydescription || 'A Premium Gated Project Designed on a Global Model of Thoughtfully Crafted Communities...'}
              </p>
              <div className="text-sm text-gray-500">
                Booked on <span className="font-medium">{bookingDate}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[120px] justify-center">
              <Button
                variant="secondary"
                fullWidth
                onClick={(event) => {
                  event.stopPropagation();
                  setIsModalOpen(true); // Open the modal
                  // navigate('/contact-us');

                }}
              >
                Need Support
              </Button>
              <Button
                variant="red"
                fullWidth
                className="hover:bg-red-700"
                // onClick={handleCancel} // Call handleCancel on click
                onClick={(event) => {
                  event.stopPropagation();
                  setIsCancelConfirmOpen(true); // show confirmation modal
                }}
              >
                Cancel
              </Button>
              {/* Mount the modal outside of the clickable area */}
              <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              <CancelConfirmationModal
                isOpen={isCancelConfirmOpen}
                onClose={() => setIsCancelConfirmOpen(false)}
                onConfirm={handleCancelConfirmed}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};