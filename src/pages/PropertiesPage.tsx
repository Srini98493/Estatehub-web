import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { PropertyFilter, PropertyType, ViewType } from '../components/properties/PropertyFilter';
import { PropertyList } from '../components/properties/PropertyList';
import { PropertyGridView } from '../components/properties/PropertyGridView';
import { Pagination } from '../components/common/Pagination';
import { usePropertyStore } from '../store/propertyStore';
import { useLocation } from 'react-router-dom';
import PropertySearch from '../components/properties/PropertySearch';

const ITEMS_PER_PAGE = 10;

interface Property {
  propertyid: number;
  propertytype: string;
  propertytitle: string;
  // ... other properties
}

export const PropertiesPage = () => {
  const location = useLocation();
  const { propertyCategory, city, userId } = location.state || {};
  const [selectedType, setSelectedType] = useState<PropertyType>('all');
  const [viewType, setViewType] = useState<ViewType>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const { searchResults, searchParams, isLoading, searchProperties, setSearchParams } = usePropertyStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = searchResults
    .filter((property: Property) => {
      // First filter by search query
      let propertyResult = property.generallocation.toLowerCase().includes(searchQuery.toLowerCase());
      console.log("Property Result:", propertyResult);
      return propertyResult
    })
    .filter((property: Property) => {
      // Then filter by selected property type
      let propertyTypeResult = selectedType === 'all' || property.propertytype.toLowerCase().trim() === selectedType.toLowerCase();
      console.log("Property Type Result:", propertyTypeResult);
      return propertyTypeResult
    });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  useEffect(() => {
    const fetchProperties = async () => {
      await setSearchParams({propertyCategory: propertyCategory, city: city, userId: userId});
       await searchProperties();
    };

    if (propertyCategory || city) {
      fetchProperties();
    }
  }, [propertyCategory, city, userId]);

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);  
    setSearchQuery(query); // Update the search query state
  };

  return (
    <PageLayout title={searchParams?.city ? 'Search Results' : 'Properties For You'}>
      {searchParams?.city && searchParams.city !== 'null' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchParams.propertyCategory === '1' 
              ? 'Properties for Sale' 
              : 'Properties for Rent'}
            {` in ${searchParams.city}`}
          </h2>
        </div>
      )}

      <PropertySearch onSearch={handleSearch} />

      <PropertyFilter
        selectedType={selectedType}
        viewType={viewType}
        onTypeChange={(type) => {
          setSelectedType(type);
          setCurrentPage(1);
        }}
        onViewChange={setViewType}
      />
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          {viewType === 'grid' ? (
            <PropertyGridView 
              properties={paginatedProperties} 
              isLoading={isLoading} 
            />
          ) : (
            <PropertyList 
              properties={paginatedProperties} 
              isLoading={isLoading} 
            />
          )}
          
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
  );
};