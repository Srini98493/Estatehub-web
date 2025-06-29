import React from "react";
import { BookingCard } from "./BookingCard";
import { useBookings } from "../../hooks/useBookings";
import { format } from "date-fns";
import { Building } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const BookingList = () => {
  const { bookings, isLoading } = useBookings();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <div className="text-center py-12">
        <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Bookings Found
        </h3>
        <p className="text-gray-500">You haven't made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.propertyid}
          property={booking}
          bookingDate={booking.bookeddate}
          onNavigate={() =>
            navigate(`/properties/${booking.propertyid}`, {
              state: { from: location.pathname },
            })
          } // Handle navigation here
        />
      ))}
    </div>
  );
};
