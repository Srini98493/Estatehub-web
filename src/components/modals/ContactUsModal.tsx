import React, { useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Click on background closes modal
    >
      <div
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from bubbling
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-gray-600">
            We're here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 justify-items-center">
          {/* Email */}
          <div className="w-full max-w-sm">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                </div>
              </div>
              <a
                href="mailto:Support@estateshub.co.in"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Support@estateshub.co.in
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="w-full max-w-sm">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                </div>
              </div>
              <a
                href="tel:+919000062299"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                +91 90000 62299
              </a>
            </div>
          </div>
        </div>
        
      {/* Close button at the bottom */}
      <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
