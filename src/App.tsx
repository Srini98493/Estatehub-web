import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { MyPropertiesPage } from './pages/MyPropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LoginModal } from './components/auth/LoginModal';
import { Toaster } from 'react-hot-toast';
import { ApprovePropertiesPage } from './pages/ApprovePropertiesPage';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { ApplyHomeLoansPage } from './pages/ApplyHomeLoansPage';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ContactUsModal } from './components/modals/ContactUsModal';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

function App() {
  return (
    <ErrorBoundary>
      <Toaster position="top-right" />
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/my-properties" element={<MyPropertiesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/approve-properties" element={<ApprovePropertiesPage/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/apply-home-loans" element={<ApplyHomeLoansPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path='contact-us' element={<ContactUsPage/>} />
          <Route path='contactmodel-us' element={<ContactUsModal isOpen={true} onClose={() => {}} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
        <LoginModal />
      {/* </BrowserRouter> */}
    </ErrorBoundary>
  );
}

export default App;