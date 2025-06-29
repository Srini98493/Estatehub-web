import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { BookingFilter } from '../components/bookings/BookingFilter';
import { BookingList } from '../components/bookings/BookingList';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/common/Button';

export const MyBookingsPage = () => {
  const { isAuthenticated, toggleLoginModal } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <PageLayout title="My Bookings">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Please sign in to view your bookings</p>
          {/* <Button
            onClick={() => toggleLoginModal(true)}
            className="mt-4"
          >
            Sign In
          </Button> */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Bookings">
      <BookingList />
    </PageLayout>
  );
};