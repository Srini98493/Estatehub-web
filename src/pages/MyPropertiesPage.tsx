import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { MyPropertyList } from '../components/properties/MyPropertyList';
import { Pagination } from '../components/common/Pagination';
// import { useUserProperties } from '../hooks/useUserProperties';
import { useAuthStore } from '../store/authStore';
import { PropertyFormModal } from '../components/properties/PropertyFormModal';
import { Property } from '../types'; // Update the path to the correct location of the 'types' file
import { Button } from '../components/common/Button';
import { useProperty } from '../hooks/useProperties';

const ITEMS_PER_PAGE = 10;

export const MyPropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: properties = [], isLoading, error, refetch } = useProperty();
  const { user, isAuthenticated, toggleLoginModal } = useAuthStore();
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  interface FilteredProperty extends Property {
    createdby: number;
  }

  const filteredProperties: FilteredProperty[] = properties.filter(
    (property: Property & { createdby: number }) => property.createdby === user?.userid
  );
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ).reverse();

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setShowPropertyModal(true);
  };

  const handleDeleteProperty = async (propertyId: number) => {
    console.log('Delete property:', propertyId);
  };

  const handleModalClose = () => {
    setShowPropertyModal(false);
    setSelectedProperty(null);
    refetch();
  };

  const headerContent = (
    <Button 
      onClick={handleAddProperty}
      className="flex items-center gap-2"
    >
      <Plus className="h-5 w-5" />
      Add Property
    </Button>
  );

  if (!isAuthenticated) {
    return (
      <PageLayout title="My Properties">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please sign in to view your properties</p>
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
  // console.log("Parent selectedProperty:", selectedProperty);
  return (
    <>
      <PageLayout title="My Properties" headerContent={headerContent}>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            Failed to load properties. Please try again later.
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found</p>
            <p className="text-gray-500 mt-2">Start by adding your first property</p>
          </div>
        ) : (
          <>
            <MyPropertyList 
              properties={paginatedProperties} 
              isLoading={false}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </PageLayout>

      <PropertyFormModal
        isOpen={showPropertyModal}
        onClose={handleModalClose}
        initialData={selectedProperty}
        isEdit={!!selectedProperty}
        isHomepage={false} // Set this value as appropriate for your use case
      />
    </>
  );
};