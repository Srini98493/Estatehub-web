import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { Button } from '../components/common/Button';
import { PageLayout } from '../components/layout/PageLayout';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { api } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const { deleteAccount } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const handleDeleteAccount = async () => {
    if (confirmationText.toLowerCase() !== 'delete my account') {
      toast.error('Please type the confirmation text exactly as shown');
      return;
    }

    setIsDeleting(true);
    try {
      const response = await api.delete(API_ENDPOINTS.DELETE_USER);
      console.log("Delete response", response);
      if(response?.success){
        deleteAccount();
        toast.success('Account deleted successfully!');
      }else{
        toast.error('Failed to delete account. Please try again.');
      }
      navigate('/');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <PageLayout title="Delete Account">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-full">
              <ShieldAlert className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Delete Your Account</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-medium mb-2">Warning: This action cannot be undone</h3>
                  <p className="text-red-700">
                    Deleting your account will permanently remove all your data, including:
                  </p>
                  <ul className="list-disc list-inside text-red-700 mt-2 space-y-1">
                    <li>Your profile information</li>
                    <li>All your properties and listings</li>
                    <li>Your favorites and saved searches</li>
                    <li>Your booking history</li>
                    <li>All your account settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                To confirm that you want to delete your account, please type the following text exactly as shown:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-medium mb-2">Confirmation text:</p>
                <p className="text-gray-700 font-mono">delete my account</p>
              </div>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="Type the confirmation text here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="red"
                onClick={handleDeleteAccount}
                disabled={confirmationText.toLowerCase() !== 'delete my account' || isDeleting}
                className="flex-1"
              >
                {isDeleting ? 'Deleting Account...' : 'Delete Account'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}; 