import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemePreset = 'default' | 'ocean' | 'sunset' | 'forest' | 'purple' | 'rose';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}

interface ThemeColorSet {
  light: ThemeColors;
  dark: ThemeColors;
}

const themePresets: Record<ThemePreset, ThemeColorSet> = {
  default: {
    light: {
      primary: '214 95% 55%',
      secondary: '165 65% 52%',
      accent: '280 70% 62%',
      gradient: 'linear-gradient(135deg, hsl(214 95% 55%) 0%, hsl(280 70% 62%) 50%, hsl(165 65% 52%) 100%)',
    },
    dark: {
      primary: '214 95% 60%',
      secondary: '165 65% 58%',
      accent: '280 70% 68%',
      gradient: 'linear-gradient(135deg, hsl(214 95% 60%) 0%, hsl(280 70% 68%) 50%, hsl(165 65% 58%) 100%)',
    },
  },
  ocean: {
    light: {
      primary: '200 95% 50%',
      secondary: '180 70% 55%',
      accent: '190 80% 45%',
      gradient: 'linear-gradient(135deg, hsl(200 95% 50%) 0%, hsl(180 70% 55%) 50%, hsl(190 80% 45%) 100%)',
    },
    dark: {
      primary: '200 95% 58%',
      secondary: '180 70% 60%',
      accent: '190 80% 52%',
      gradient: 'linear-gradient(135deg, hsl(200 95% 58%) 0%, hsl(180 70% 60%) 50%, hsl(190 80% 52%) 100%)',
    },
  },
  sunset: {
    light: {
      primary: '15 90% 60%',
      secondary: '340 85% 60%',
      accent: '280 75% 65%',
      gradient: 'linear-gradient(135deg, hsl(15 90% 60%) 0%, hsl(340 85% 60%) 50%, hsl(280 75% 65%) 100%)',
    },
    dark: {
      primary: '15 90% 65%',
      secondary: '340 85% 65%',
      accent: '280 75% 70%',
      gradient: 'linear-gradient(135deg, hsl(15 90% 65%) 0%, hsl(340 85% 65%) 50%, hsl(280 75% 70%) 100%)',
    },
  },
  forest: {
    light: {
      primary: '140 70% 45%',
      secondary: '165 60% 50%',
      accent: '120 65% 40%',
      gradient: 'linear-gradient(135deg, hsl(140 70% 45%) 0%, hsl(165 60% 50%) 50%, hsl(120 65% 40%) 100%)',
    },
    dark: {
      primary: '140 70% 55%',
      secondary: '165 60% 58%',
      accent: '120 65% 50%',
      gradient: 'linear-gradient(135deg, hsl(140 70% 55%) 0%, hsl(165 60% 58%) 50%, hsl(120 65% 50%) 100%)',
    },
  },
  purple: {
    light: {
      primary: '270 80% 60%',
      secondary: '290 75% 65%',
      accent: '250 85% 55%',
      gradient: 'linear-gradient(135deg, hsl(270 80% 60%) 0%, hsl(290 75% 65%) 50%, hsl(250 85% 55%) 100%)',
    },
    dark: {
      primary: '270 80% 65%',
      secondary: '290 75% 70%',
      accent: '250 85% 62%',
      gradient: 'linear-gradient(135deg, hsl(270 80% 65%) 0%, hsl(290 75% 70%) 50%, hsl(250 85% 62%) 100%)',
    },
  },
  rose: {
    light: {
      primary: '340 85% 60%',
      secondary: '320 80% 65%',
      accent: '0 75% 60%',
      gradient: 'linear-gradient(135deg, hsl(340 85% 60%) 0%, hsl(320 80% 65%) 50%, hsl(0 75% 60%) 100%)',
    },
    dark: {
      primary: '340 85% 65%',
      secondary: '320 80% 70%',
      accent: '0 75% 65%',
      gradient: 'linear-gradient(135deg, hsl(340 85% 65%) 0%, hsl(320 80% 70%) 50%, hsl(0 75% 65%) 100%)',
    },
  },
};

interface ThemeState {
  currentTheme: ThemePreset;
  isDarkMode: boolean;
  setTheme: (theme: ThemePreset) => void;
  toggleDarkMode: () => void;
  applyTheme: (theme: ThemePreset, isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'default',
      isDarkMode: false,
      
      setTheme: (theme: ThemePreset) => {
        set({ currentTheme: theme });
        const state = get();
        state.applyTheme(theme, state.isDarkMode);
      },
      
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          const root = document.documentElement;
          
          if (newDarkMode) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
          
          state.applyTheme(state.currentTheme, newDarkMode);
          return { isDarkMode: newDarkMode };
        });
      },
      
      applyTheme: (theme: ThemePreset, isDark: boolean) => {
        const colors = isDark ? themePresets[theme].dark : themePresets[theme].light;
        const root = document.documentElement;
        
        // Update CSS variables
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--gradient-hero', colors.gradient);
        
        // Update chart colors to match theme
        root.style.setProperty('--chart-1', colors.primary);
        root.style.setProperty('--chart-2', colors.secondary);
        root.style.setProperty('--chart-3', colors.accent);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on app load
        if (state) {
          const root = document.documentElement;
          if (state.isDarkMode) {
            root.classList.add('dark');
          }
          state.applyTheme(state.currentTheme, state.isDarkMode);
        }
      },
    }
  )
);
