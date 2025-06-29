import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { PropertyGridView } from '../components/properties/PropertyGridView';
import { Newsletter } from '../components/home/Newsletter';
import { Sidebar } from '../components/layout/Sidebar';
import { PageHeader } from '../components/layout/PageHeader';
import { Footer } from '../components/layout/Footer';
import { useTopProperties } from '../hooks/useTopProperties';
import { PopularGrid } from '../components/properties/PopularGrid';
import { PropertyFormModal } from '../components/properties/PropertyFormModal';

export const HomePage = () => {
  const { data: topProperties, isLoading, error } = useTopProperties();
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="transition-all duration-300 ml-20 lg:ml-64">
        <PageHeader title="" />
        <div className="w-full">
          <Hero onPostAdClick={() => setShowPropertyModal(true)} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">Loading top properties...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error.message}</div>
            ) : (
              <>
                {/* Top Rental Properties Section */}
                <section className="py-16 bg-white">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Top Properties for Rentals</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                      Discover your perfect Rent properties from our most viewed and liked sections
                    </p>
                  </div>
                  <PopularGrid properties={topProperties.rentals} title="Top Rentals" />
                </section>

                {/* Premium Properties for Sale Section */}
                <section className="py-16 bg-gray-50">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Top Properties for Sale</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                     Discover your perfect sell property from our most viewed and liked sections
                    </p>
                  </div>
                  <PopularGrid properties={topProperties.sales} title="Top Sales" />
                </section>
              </>
            )}
            <Newsletter />
          </div>
        </div>
        <Footer />
        
        {showPropertyModal && (
          <PropertyFormModal
            isOpen={showPropertyModal}
            onClose={() => setShowPropertyModal(false)}
            initialData={selectedProperty}
            isEdit={!!selectedProperty}
            isHomepage={true}
          />
        )}
      </main>
    </div>
  );
};