import React from "react";
import { Wrench } from "lucide-react";

interface ServiceRequestCardProps {
  category: string;
  description: string;
  requestedBy: string;
  contact: string;
  email: string;
  date: string;
  areaCode: string;
}

export const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  category,
  description,
  requestedBy,
  date,
  contact,
  areaCode,
  email,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Wrench className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <p className="text-gray-600 mb-2">{category}</p>

          <div className="flex items-center justify-between mb-2 w-full max-w-screen-lg ">
            <h3 className=" text-gray-600 description">{description}</h3>
          </div>

          <div className="flex flex-col justify-between text-sm text-gray-500">
            <div>
              <span className="font-bold"> Contact: </span>{" "}
              <span>
                {areaCode} - {contact}
              </span>
            </div>
            <div>
              <span className="font-bold">Email: </span> <span>{email}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              <span className="font-bold">Requested by: </span>{" "}
              <span>{requestedBy}</span>
            </div>
            <div>
              <span className="font-bold">Requested on: </span>{" "}
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
