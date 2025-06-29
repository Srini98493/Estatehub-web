import React from "react";
import { Eye, Clock, Heart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useFavorites } from "../../hooks/useFavorites";

interface FavoriteCardProps {
  property: Property;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { removeFavorite } = useFavorites(isFavorite);
  //create bool state and pass it to useFavorites

  const handleRemoveFromFavorites = async (propertyId: number) => {
    setIsFavorite(true);
    await removeFavorite(propertyId);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() =>
        navigate(`/property/${property.id}`, {
          state: { from: location.pathname },
        })
      }
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-72 h-48">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {property.title}
              </h3>
              <div className="flex gap-2 text-sm text-gray-600 mb-2">
                {property.type?.toLowerCase() !== 'open plot' && property.type?.toLowerCase() !== 'agriculture land' && (
                  <>
                    <span>{property.beds} BHK</span>
                    <span>•</span>
                  </>
                )}
                <span>{property.type}</span>
                <span>•</span>
                <span>{property.location}</span>
              </div>
              <p className="text-gray-600 line-clamp-2 mb-4">
                A Premium Gated Project Designed on a Global Model of
                Thoughtfully Crafted Communities. Experience luxury living at
                its finest.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>320 Views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Added 2 days ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[120px] self-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {property.price.toLocaleString()}
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <Button
                variant="primary"
                className="!bg-red-50 !text-red-600 hover:!bg-red-100 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromFavorites(property.id);
                  // Handle remove from favorites
                }}
              >
                <Heart className="h-4 w-4 fill-current" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
