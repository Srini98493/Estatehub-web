import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../common/Button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout, toggleLoginModal } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold">SiteLogo</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/properties"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Properties
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Services
            </Link>
            {!isAuthenticated ? (
              <Button onClick={() => toggleLoginModal(true)} className="mt-4">
                Sign In
              </Button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <span className="text-gray-700">{user?.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/my-properties"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Properties
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/properties"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              {!isAuthenticated ? (
                <Button
                  onClick={() => {
                    toggleLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="mt-4"
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <div className="px-3 py-2 flex items-center space-x-2">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                    <span className="text-gray-700 font-medium">
                      {user?.name}
                    </span>
                  </div>
                  <Link
                    to="/my-properties"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Properties
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
