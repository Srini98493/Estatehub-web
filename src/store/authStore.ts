import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  userid: number;
  fullname: string;
  username: string;
  useremail: string;
  profileimagepath: string;
  isadmin: boolean;
  usertype: number;
  name?: string;
  areacode?: string;
  contactno?: string;
  socialemail?: string;
  gender?: string;
  dob?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  isnotificationenabled?: boolean;
}

interface Tokens {
  access: {
    token: string;
    expires: number;
  };
  refresh: {
    token: string;
    expires: number;
  };
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  showLoginModal: boolean;
  login: (data: { user: User; tokens: Tokens }) => void;
  logout: () => void;
  toggleLoginModal: (show: boolean) => void;
  deleteAccount: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      showLoginModal: false,
      login: (data) => {
        console.log("login data", data)
        
        set({
          user: data.user,
          tokens: data.tokens,
          isAuthenticated: true,
        });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('userData');
        set({ user: null, tokens: null, isAuthenticated: false });
      },
      toggleLoginModal: (show) => set({ showLoginModal: show }),
      deleteAccount: async () => {
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpiry');
          localStorage.removeItem('userData');
          set({ user: null, tokens: null, isAuthenticated: false });
        } catch (error) {
          console.error('Error deleting account:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Initialize auth state from localStorage
const initializeAuth = () => {
  const userData = localStorage.getItem('userData');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  if (userData && accessToken && refreshToken && tokenExpiry) {
    const user = JSON.parse(userData);
    const tokens = {
      access: {
        token: accessToken,
        expires: parseInt(tokenExpiry),
      },
      refresh: {
        token: refreshToken,
        expires: parseInt(tokenExpiry) + 2592000000, // refresh token expires 30 days later
      },
    };

    useAuthStore.getState().login({ user, tokens });
  }
};

// Call this when your app starts
initializeAuth();