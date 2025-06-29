import React from 'react';
import { ServiceRequestCard } from './ServiceRequestCard';

interface ServiceRequest {
  id: number;
  category: string;
  description: string;
  requestedBy: string;
  contact: string;
  email: string;
  date: string;
  areaCode: string;
}
// console.log("Parent sending areaCode:", service?.areaCode);
interface ServiceRequestListProps {
  services: ServiceRequest[];
  isLoading: boolean;
}

export const ServiceRequestList: React.FC<ServiceRequestListProps> = ({ services, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        {/* <p className="text-gray-600 text-lg">No service requests have been posted yet.</p> */}
        <p className="text-gray-600 text-lg">Looks like there are no service requests yet. Be the first to post one!</p>
        
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {services.map((service) => (
          <ServiceRequestCard
            key={service.id}
            category={service.category}
            description={service.description}
            requestedBy={service.requestedBy}
            contact={service.contact}
            email={service.email}
            date={service.date}
            areaCode={service.areaCode}
          />
        ))}
      </div>
    </div>
  );
};