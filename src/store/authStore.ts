import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  abhaId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'patient' | 'doctor') => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - replace with actual API call
        // const response = await axios.post('/api/auth/login', { email, password });
        
        // For demo: determine role based on email
        const isDoctor = email.includes('doctor') || email.includes('dr.');
        
        const mockUser: User = {
          id: isDoctor ? '2' : '1',
          email,
          name: isDoctor ? 'Dr. Sarah Smith' : 'John Doe',
          role: isDoctor ? 'doctor' : 'patient',
          abhaId: isDoctor ? undefined : 'ABHA-1234-5678-9012'
        };
        set({ 
          user: mockUser, 
          token: 'mock-jwt-token', 
          isAuthenticated: true 
        });
      },
      register: async (email: string, password: string, name: string, role: 'patient' | 'doctor') => {
        // Mock registration - replace with actual API call
        // const response = await axios.post('/api/auth/register', { email, password, name, role });
        const mockUser: User = {
          id: '1',
          email,
          name,
          role,
        };
        set({ 
          user: mockUser, 
          token: 'mock-jwt-token', 
          isAuthenticated: true 
        });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateUser: (updatedUser: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
