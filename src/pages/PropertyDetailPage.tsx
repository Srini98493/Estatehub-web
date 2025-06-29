import React from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Home, Calendar, User, BathIcon } from "lucide-react";
import { PageLayout } from "../components/layout/PageLayout";
import { useProperty, Attachment } from "../hooks";
import { useBookProperty } from "../hooks/useBookProperty";
import { toast } from "react-hot-toast";
import { Button } from "../components/common/Button";
import Slider from "react-slick";

// In your main entry file (e.g., index.tsx or App.tsx)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFavorites } from "../hooks/useFavorites";
import { useAuthStore } from "../store/authStore";

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, toggleLoginModal } = useAuthStore();

  let userId = user?.userid !== undefined ? user?.userid : 0;
  const { data: property, isLoading, error, refetch } = useProperty(id, userId);

  const bookProperty = useBookProperty();

  const { addFavorite, isSuccess, removeFavorite } = useFavorites();

  const loggedInUserId = user?.userid;
  const propertyCreatedById = property?.createdby;

  const handleBooking = async () => {
    if (!property) return;

    //If user is not logged in, show login modal
    if (!user) {
      toggleLoginModal(true);
      return;
    }

    try {
      const bookingData = {
        bookedDate: new Date().toISOString(),
        cancelledDate: null,
        isBooked: true,
        isCancelled: false,
        reasonForCancellation: "",
      };

      await bookProperty.mutateAsync({
        propertyId: property.propertyid,
        bookingData,
      });

      toast.success("Property booked successfully!", {
        duration: 3000,
        position: "top-right",
      });

      refetch();

    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book property", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  const handleBackNavigation = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/properties"); // Fallback route
    }
  };

  const handleSave = async () => {

    //If user is not logged in, show login modal
    if (!user) {
      toggleLoginModal(true);
      return;
    }

    if (property?.isfavourite) {
      try {
        await removeFavorite(property.propertyid);
        toast.success("Property removed from favorites!", {
          duration: 3000,
          position: "top-right",
        });
        refetch();
      } catch (error) {
        console.error("Failed to remove property from favorites", error);
        toast.error("Failed to remove property from favorites", {
          duration: 3000,
          position: "top-right",
        });
      }
    } else {

      try {
        await addFavorite(property.propertyid);
        toast.success("Property added to favorites!", {
          duration: 3000,
          position: "top-right",
        });
        refetch();
      } catch (error) {
        console.error("Failed to add property to favorites", error);
        toast.error("Failed to add property to favorites", {
          duration: 3000,
          position: "top-right",
        });
      }
    };
  }

  if (isLoading) {
    return (
      <PageLayout title="Loading Property...">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !property) {
    return (
      <PageLayout title="Property Not Found">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error instanceof Error ? error.message : "Property not found"}
            </h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for might have been removed or is
              temporarily unavailable.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Properties
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const headerContent = (
    <button
      onClick={handleBackNavigation}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Back</span>
    </button>
  );

  const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="bg-blue-600 rounded-full shadow-lg slick-arrow slick-next"
        onClick={onClick}
      >
        <h2 className="m-0 text-black">&gt;</h2>
      </div>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="bg-blue-600 rounded-full shadow-lg slick-arrow slick-prev"
        onClick={onClick}
      >
        <h2 className="m-0 text-black">&lt;</h2>
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  console.log("property", property)

  console.log(property.amenities); // Check the structure of property.amenities
  console.log(Array.isArray(property.amenities)); // Should log true if it's an array


  return (
    <PageLayout title={property.propertytitle} headerContent={headerContent}>
      <div className="w-full mb-8">
        {property.attachments?.length <= 2 ? (
          <div className="flex justify-between">
            {property.attachments.map((attachment: Attachment) => (
              <img
                key={attachment.attachmentid}
                src={attachment.attachmenturl}
                alt={attachment.attachmentname}
                className="w-[48%] h-[350px] object-cover rounded-lg"
              />
            ))}
          </div>
        ) : property.attachments?.length > 2 ? (
          <Slider {...sliderSettings}>
            {property.attachments.map((attachment: Attachment) => (
              <div className="w-full flex justify-center">
                <img
                  key={attachment.attachmentid}
                  src={attachment.attachmenturl}
                  alt={attachment.attachmentname}
                  className="w-[90%] h-[300px] object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        ) : property.attachments?.length === 0 ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="bg-gray-200 shadow-lg rounded-lg h-full w-[90%] p-6 flex items-center justify-center">
              <p className="text-black">No images available</p>
            </div>
          </div>
        ) : (
          <div>No images available</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Property Overview */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${property.propertycategory === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {property.propertycategoryname}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{property.status}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {property.propertytitle}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{property.generallocation}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {property.currencytype} {property.price.toLocaleString()}
                </div>
                <div className="text-gray-500">{property.area}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y my-6">
              <div className="text-center">
                <Home className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <div className="text-lg font-semibold">
                {property.propertytype?.toLowerCase() !== 'open plot' && property.propertytype?.toLowerCase() !== 'agriculture land' && property.bedrooms !== undefined ? (
                  <span>{property.bedrooms} BHK</span>
                ) : (
                  <span>Not Applicable</span>
                )}
                </div>
                <div className="text-sm text-gray-500">
                  {property.propertytype}
                </div>
              </div>
              <div className="text-center">
                <BathIcon className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <div className="text-lg font-semibold">
                {property.propertytype?.toLowerCase() !== 'open plot' && property.propertytype?.toLowerCase() !== 'agriculture land' && property.bathrooms !== undefined ? (
                  <span>{property.bathrooms} Bath Rooms</span>
                ) : (
                  <span>Not Applicable</span>
                )}
                </div>
                <div className="text-sm text-gray-500">
                  {property.propertytype}
                </div>
              </div>
              <div className="text-center">
                <Calendar className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <div className="text-lg font-semibold">Available</div>
                <div className="text-sm text-gray-500">
                  {new Date(property.availabledate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-center">
                <User className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                <div className="text-lg font-semibold">Posted by</div>
                <div className="text-sm text-gray-500">{property.postedby}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 w-full max-w-screen-lg">Description</h3>
              <p className="text-gray-600 whitespace-pre-line description">
                {property.propertydescription}
              </p>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities && property.amenities.length > 0 ? (
                property.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>{amenity}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-gray-600 text-center">
                  No amenities available
                </div>
              )}
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Location Details</h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span>
                  {property.address}, {property.landmark}, {property.city},{" "}
                  {property.state}, {property.country} - {property.pincode}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {userId !== propertyCreatedById && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex flex-col gap-4">

                <>
                  <Button
                    onClick={handleBooking}
                    disabled={bookProperty.isPending || property.isbooked}
                    fullWidth
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {bookProperty.isPending
                      ? "Booking..."
                      : property.isbooked
                        ? "Booked"
                        : "Book Now"}
                  </Button>

                  <Button
                    variant="secondary"
                    fullWidth
                    size="lg"
                    className={`flex items-center justify-center gap-2 ${property.isfavourite
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    onClick={handleSave}
                  >
                    {property.isfavourite ? (
                      <Heart className="h-5 w-5" />
                    ) : (
                      <Heart className="h-5 w-5 text-white fill-red-500 border-red-500 border-0" />
                    )}
                    {property.isfavourite ? "Remove from favorites" : "Save"}
                  </Button>
                </>

              </div>
            </div>
          </div>
        )}


      </div>
    </PageLayout>
  );
};
