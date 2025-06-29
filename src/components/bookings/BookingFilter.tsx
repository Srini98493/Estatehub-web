import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const propertyTypes = ['House', 'Apartment', 'Hotel', 'Villa', 'Cottage'];

export const BookingFilter = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search address, or near you"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-3 rounded-lg bg-[#0084FF] text-white hover:bg-blue-600">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {propertyTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              ${type === 'House' 
                ? 'bg-[#0084FF] text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};