import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { LoginFormData, RegisterFormData } from '../types/auth';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, toggleLoginModal } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      toggleLoginModal(false);
    },
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        setUser(null);
        queryClient.clear();
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      setUser(data.user);
      toggleLoginModal(false);
    },
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        setUser(null);
        queryClient.clear();
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      setUser(null);
      queryClient.clear();
    },
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: !!localStorage.getItem('auth_token'),
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        setUser(null);
        queryClient.clear();
      }
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    profile,
    isLoadingProfile,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};