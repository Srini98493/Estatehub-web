import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Button } from '../components/common/Button';
import logo from '../assets/logo.png';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/v1/auth/forgot-password`, { email });
      toast.success('Password reset link sent to your email!');
      navigate('/'); // Redirect to home or login page after success
    } catch (err) {
      console.error('Error sending reset link:', err);
      toast.error('We did not find an account with that email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#2e5c7d] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <img src={logo} alt="Estate Hub" className="mb-4 h-20 w-20 mx-auto" />
        <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
        <p className="text-gray-600 mb-6 text-center">Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button type="submit" fullWidth size="lg">
            Submit
          </Button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 