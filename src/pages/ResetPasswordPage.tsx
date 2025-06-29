import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { api } from '../utils/api'; // Import the api utility
import { API_ENDPOINTS } from '../config/api'; // Import the API endpoints
import { Button } from '../components/common/Button';
import logo from '../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from Font Awesome

const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const otp = queryParams.get('otp');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await api.post(API_ENDPOINTS.RESET_PASSWORD, {
        token,
        otp,
        newPassword,
      });
      toast.success('Password reset successfully! You can now log in.');
      // Redirect to login or home page
      navigate('/');
    } catch (err) {
      console.error('Error resetting password:', err);
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#2e5c7d] flex items-center justify-center"> {/* Set background color */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"> {/* Card styles */}
        <img src={logo} alt="Estate Hub" className="mb-4 h-20 w-20 mx-auto" />
        <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-gray-600 mb-6 text-center">Create a new password for your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative"> {/* Added relative for positioning the icon */}
            <input
              type={showNewPassword ? 'text' : 'password'} // Toggle input type
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)} // Toggle visibility
              className="absolute right-3 top-2 text-gray-500" // Position the icon
            >
              {showNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />} {/* Eye icon */}
            </button>
          </div>
          <div className="mb-4 relative"> {/* Added relative for positioning the icon */}
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
              className="absolute right-3 top-2 text-gray-500" // Position the icon
            >
              {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />} {/* Eye icon */}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button type="submit" fullWidth size="lg">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 