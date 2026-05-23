import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, City, CandidateProfile, EmployerProfile } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

interface GeoState {
  currentCity: City | null;
  isCityModalOpen: boolean;
  popularCities: City[];
  setCurrentCity: (city: City) => void;
  openCityModal: () => void;
  closeCityModal: () => void;
  setPopularCities: (cities: City[]) => void;
}

interface AppState extends AuthState, GeoState {}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth State
      user: null,
      token: null,
      role: null,
      isLoading: false,
      login: (user, token) => set({ user, token, role: user.role }),
      logout: () => set({ user: null, token: null, role: null }),
      setLoading: (isLoading) => set({ isLoading }),

      // Geo State
      currentCity: null,
      isCityModalOpen: false,
      popularCities: [],
      setCurrentCity: (city) => set({ currentCity: city }),
      openCityModal: () => set({ isCityModalOpen: true }),
      closeCityModal: () => set({ isCityModalOpen: false }),
      setPopularCities: (cities) => set({ popularCities: cities }),
    }),
    {
      name: 'job-platform-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        role: state.role,
        currentCity: state.currentCity 
      }),
    }
  )
);
