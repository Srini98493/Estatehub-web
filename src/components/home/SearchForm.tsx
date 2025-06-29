import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { usePropertyStore } from "../../store/propertyStore";
import { Button } from "../common/Button";
import { PropertyFormModal } from "../properties/PropertyFormModal";
import { Property } from "../../types";

interface SearchFormProps {
  onPostAdClick: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onPostAdClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, showLoginModal, toggleLoginModal } = useAuthStore();
  const { searchProperties, setSearchParams } = usePropertyStore();
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    //reset showPropertyModal to false when user is logged out
    if (!user) {
      setShowPropertyModal(false);
    }
  }, [user, toggleLoginModal]);

  const handleSearch = async (propertyCategory: number) => {
    try {
      const userId = user?.userid || null;
      await setSearchParams({
        propertyCategory: propertyCategory.toString(),
        city: searchTerm || "null",
        userId: userId,
      });

      await searchProperties();

      // Navigate to properties page with search parameters
      navigate("/properties", {
        state: {
          propertyCategory: propertyCategory.toString(),
          city: searchTerm || "null",
          userId: userId,
        },
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search by City"
              className="w-full px-4 py-3 text-gray-900 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <div className="flex gap-4 sm:flex-shrink-0">
            <Button
              type="button"
              onClick={() => handleSearch(1)}
              className="flex-1 sm:flex-none whitespace-nowrap"
              size="lg"
            >
              For Sale
            </Button>
            <Button
              type="button"
              onClick={() => handleSearch(2)}
              className="flex-1 sm:flex-none whitespace-nowrap"
              size="lg"
            >
              To Rent
            </Button>
          </div>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 mr-2"></div>
          <h2 className="text-lg font-semibold text-center mb-2 text-gray-400">
            Are you a Property Owner?
          </h2>
          <div className="flex-grow border-t border-gray-300 ml-2"></div>
        </div>

        <div className="">
          <div className="text-center">
            <Button
              type="button"
              className="bg-teal-500 text-white rounded-lg px-4 py-2"
              onClick={() => {
                if (!user) {
                  toggleLoginModal(true);
                } else {
                  onPostAdClick();
                }
              }}
            >
              Post Free Property Ad
            </Button>
          </div>
        </div>
      </div>
      {showPropertyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-80 flex items-center justify-center">
          <div className="mt-20">
            <PropertyFormModal
              isOpen={showPropertyModal}
              onClose={() => setShowPropertyModal(false)}
              initialData={selectedProperty}
              isEdit={!!selectedProperty}
              isHomepage={true}
            />
          </div>
        </div>
      )}
    </form>
  );
};
