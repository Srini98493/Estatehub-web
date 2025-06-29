// components/modals/CancelConfirmationModal.tsx
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // <-- import the icon
import { Button } from "../../components/common/Button";

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md text-center">
    <div className="flex flex-col items-center mb-4">
      <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-2" />
      <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
    </div>

    <p className="mb-6">Are you sure you want to remove this booking?</p>

    <div className="flex justify-center gap-4">
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click handler from being triggered
          onClose();
        }}
        className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        No, Keep My Booking
      </Button>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent click handler from being triggered
          onConfirm();
        }}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
      >
        Yes, Cancel Booking
      </button>
    </div>
  </div>
</div>


  );
};
