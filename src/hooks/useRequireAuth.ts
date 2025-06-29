import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useRequireAuth = () => {
  const { isAuthenticated, toggleLoginModal } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      toggleLoginModal(true);
    }
  }, [isAuthenticated, toggleLoginModal]);

  return isAuthenticated;
};