import React from "react";
import { ServiceRequestCard } from "./ServiceRequestCard";

const mockHistory: any[] = [];

export const ServiceHistory: React.FC = () => {
  if (!mockHistory || mockHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No NRI Property Service history found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {mockHistory.map((request) => (
        <ServiceRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};
