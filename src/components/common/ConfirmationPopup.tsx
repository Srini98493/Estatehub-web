import React from "react";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  subdescription: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  subdescription,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-8 w-100"
        onClick={handleOverlayClick}
      >
        <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
        <p className="mb-2 pt-4 text-gray-600 text-center">{description}</p>
        <p className="mb-6 pb-4 text-gray-600 text-center">{subdescription}</p>
        <div className="flex items-center justify-center gap-20">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
