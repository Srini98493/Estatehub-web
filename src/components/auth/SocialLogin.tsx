import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { Button } from '../common/Button';

interface SocialLoginProps {
  text?: string;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ text = "Or Login with" }) => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
    } catch (error) {
      console.error('Error logging in with Google:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{text}</span>
        </div>
      </div>

      <Button
        onClick={handleGoogleLogin}
        variant="secondary"
        fullWidth
        className="flex items-center justify-center gap-2"
      >
        <FaGoogle className="h-5 w-5 text-[#DB4437]" />
        <span>Continue with Google</span>
      </Button>
    </div>
  );
};