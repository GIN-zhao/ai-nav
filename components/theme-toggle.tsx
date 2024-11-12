'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={`rounded-full w-10 h-10
        ${theme === 'light'
          ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-all" />
      ) : (
        <Sun className="h-5 w-5 transition-all" />
      )}
    </Button>
  );
}