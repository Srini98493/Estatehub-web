import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/HomePage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { PropertyDetailsPage } from '../pages/PropertyDetailsPage';
import { MyPropertiesPage } from '../pages/MyPropertiesPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { BookingsPage } from '../pages/BookingsPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ApprovePropertiesPage } from '../pages/ApprovePropertiesPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminRoute } from '../components/auth/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'properties',
        element: <PropertiesPage />,
      },
      {
        path: 'properties/:id',
        element: <PropertyDetailsPage />,
      },
      {
        path: 'my-properties',
        element: (
          <ProtectedRoute>
            <MyPropertiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'approve-properties',
        element: (
          <AdminRoute>
            <ApprovePropertiesPage />
          </AdminRoute>
        ),
      },
      {
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute>
            <BookingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'services',
        element: (
          <ProtectedRoute>
            <ServicesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]); 