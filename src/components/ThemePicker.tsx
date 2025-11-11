import { useThemeStore, ThemePreset } from '@/store/themeStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette, Check } from 'lucide-react';

const themes: { name: string; value: ThemePreset; colors: string[] }[] = [
  {
    name: 'Healthcare (Default)',
    value: 'default',
    colors: ['hsl(214 95% 55%)', 'hsl(280 70% 62%)', 'hsl(165 65% 52%)'],
  },
  {
    name: 'Ocean Breeze',
    value: 'ocean',
    colors: ['hsl(200 95% 50%)', 'hsl(180 70% 55%)', 'hsl(190 80% 45%)'],
  },
  {
    name: 'Sunset Glow',
    value: 'sunset',
    colors: ['hsl(15 90% 60%)', 'hsl(340 85% 60%)', 'hsl(280 75% 65%)'],
  },
  {
    name: 'Forest Fresh',
    value: 'forest',
    colors: ['hsl(140 70% 45%)', 'hsl(165 60% 50%)', 'hsl(120 65% 40%)'],
  },
  {
    name: 'Royal Purple',
    value: 'purple',
    colors: ['hsl(270 80% 60%)', 'hsl(290 75% 65%)', 'hsl(250 85% 55%)'],
  },
  {
    name: 'Rose Garden',
    value: 'rose',
    colors: ['hsl(340 85% 60%)', 'hsl(320 80% 65%)', 'hsl(0 75% 60%)'],
  },
];

export const ThemePicker = () => {
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          <span className="hidden md:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Choose Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setTheme(theme.value)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span>{theme.name}</span>
              </div>
              {currentTheme === theme.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
