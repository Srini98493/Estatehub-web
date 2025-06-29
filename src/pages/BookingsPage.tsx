import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { useBookings } from '../hooks/useBookings';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';

export const BookingsPage = () => {
  const { data: bookings, isLoading, error } = useBookings();

  if (isLoading) {
    return (
      <PageLayout title="My Bookings">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="My Bookings">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error loading bookings
            </h2>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : 'An error occurred while loading your bookings.'}
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Bookings">
      <div className="grid gap-6">
        {bookings?.map((booking) => (
          <div
            key={booking.propertybookingid}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Booking #{booking.propertybookingid}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Booked for: {format(new Date(booking.bookeddate), 'PPP')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Property ID: {booking.propertyid}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.iscancelled
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {booking.iscancelled ? 'Cancelled' : 'Active'}
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  Booked on {format(new Date(booking.createddate), 'PPP')}
                </span>
              </div>
            </div>
          </div>
        ))}

        {bookings?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900">
              No bookings found
            </h3>
            <p className="text-gray-600 mt-2">
              You haven't made any bookings yet.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}; 