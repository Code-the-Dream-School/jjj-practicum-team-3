import { create } from 'zustand';
import { api } from '@/services/apiService';

interface AuthState {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
    logout: () => {
        api.logout(); // Call the API service to remove the token from local storage
        set({ isLoggedIn: false }); // Update the state in the store
    },
}));
