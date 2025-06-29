import React, { useState } from 'react';

interface PropertySearchProps {
  onSearch: (query: string) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Send the search term to the parent component
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Location"
        value={searchTerm}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full"
      />
    </div>
  );
};

export default PropertySearch; 