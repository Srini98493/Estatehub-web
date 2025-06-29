import React from 'react';
import { SearchForm } from './SearchForm';

interface HeroProps {
  onPostAdClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPostAdClick }) => {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Your Future's Most Comfortable Destination
        </h1>
        <p className="text-lg md:text-xl mb-12">
          Where comfort meets opportunity, paving the way for your future success
        </p>
        <SearchForm onPostAdClick={onPostAdClick} />
      </div>
    </div>
  );
};