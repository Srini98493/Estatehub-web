import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Pagination } from '../components/common/Pagination';
import { useFavorites } from '../hooks/useFavorites';
import { LayoutGrid, List, Bed, Bath, Square, Eye, Clock, Heart } from 'lucide-react';
import { FavoriteButton } from '../components/properties/FavoriteButton';
import { PLACEHOLDER_IMAGES } from '../constants/images';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';

const ITEMS_PER_PAGE = 10;

interface PropertyDetails {
  propertyid: number;
  propertytitle: string;
  price: number;
  area: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  currencytype: string;
  propertytype: number;
  propertycategory: number;
  generallocation: string;
  amenities: string;
}

interface FavoriteProperty {
  favouriteid: number;
  propertyid: number;
  property_details: PropertyDetails;
}

type ViewType = 'grid' | 'list';

export const FavoritesPage = () => {
  const { isAuthenticated, toggleLoginModal } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites: favorites = [], isLoading, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("favourite Data", favorites);
  

  // Remove duplicates based on propertyid
  const uniqueFavorites = favorites.reduce((acc: FavoriteProperty[], curr) => {
    const exists = acc.find(f => f.propertyid === curr.propertyid);
    if (!exists) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const totalPages = Math.ceil(uniqueFavorites.length / ITEMS_PER_PAGE);
  const paginatedFavorites = uniqueFavorites.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFavorite = async (propertyId: number) => {
    try {
      await removeFavorite(propertyId);
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  if (!isAuthenticated) {
    return (
      <PageLayout title="Favorites">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please sign in to view your favorite properties</p>
          {/* <Button
            onClick={() => toggleLoginModal(true)}
            className="mt-4"
          >
            Sign In
          </Button> */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Favorites">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : uniqueFavorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No favorite properties found</p>
          <p className="text-gray-500 mt-2">Save properties to see them here</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {favorites.map((favorite) => (
              <div onClick={() => navigate(`/properties/${favorite?.property_details?.propertyid}`, {
                state: { from: location.pathname },
              })} key={favorite.favouriteid} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row h-full cursor-pointer hover:bg-gray-100 p-4 shadow-md rounded-lg hover:shadow-lg mb-6">
                  <div className="md:w-72 h-48">
                    <img
                      src={favorite.property_details.attachments?.[0]?.attachmenturl || PLACEHOLDER_IMAGES.PROPERTY}
                      alt={favorite.property_details.propertytitle}
                      className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                  </div>

                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between flex-1">
                      <div className="flex-1 pr-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {favorite.property_details.propertytitle}
                        </h3>
                        <div className="flex items-center gap-6 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{favorite.property_details.bedrooms} Beds</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{favorite.property_details.bathrooms} Baths</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{favorite.property_details.area}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {favorite.property_details.city}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between min-w-[150px]">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-blue-600">
                            {favorite.property_details.currencytype} {favorite.property_details.price.toLocaleString()}
                          </span>
                          {/* <span className="block text-sm text-gray-500">/month</span> */}
                        </div>
                        <button 
                          onClick={(e) => {e.stopPropagation();handleRemoveFavorite(favorite.propertyid)}}
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};