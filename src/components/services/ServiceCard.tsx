import { Button } from "../common/Button";

// In ServiceCard.tsx
export const ServiceCard = ({ service }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48 h-32 sm:h-40">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {service.description}
            </p>
            <Button className="w-full sm:w-auto">
              Request Service
            </Button>
          </div>
        </div>
      </div>
    );
  };