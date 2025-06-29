import React from "react";
import successAnimation from "../../assets/Succeess Animation.svg";
import { Button } from "./Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-xl font-bold mb-4">{title}</p>
        <div className="modal-content flex justify-center items-center">
          <img src={successAnimation} alt="Success Animation" />
        </div>

        <div className="mb-4 text-center text-gray-600 text-sm py-4 max-w-xs mx-auto">
          <p className="whitespace-pre-line break-words">{description}</p>
        </div>
        <Button
          variant="primary"
          className="w-[80%]"
          onClick={onClose}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
