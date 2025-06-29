import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings, Trash2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { auth } from '../../utils/firebase'; // Adjust the import path as necessary
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated, toggleLoginModal, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => toggleLoginModal(true)}
        className="mt-4"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
      >
        <img
          // src={"https://usc1.contabostorage.com/060e835992534d1face309804cd35474:ehub-dev/properties/userprofile.png"}
          src={import.meta.env.VITE_PROFIL_IMAGE_BASE_URL}
          alt={user?.name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-700">{user?.name}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </button>
           <Link 
            to="/delete-account"
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => setShowDropdown(false)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <div className="border-t border-gray-100 my-1"></div>
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};