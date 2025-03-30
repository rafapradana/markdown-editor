import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Droplet, FlameIcon, Leaf, Cherry } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-ring">
          {theme === 'light' && <Sun size={18} className="text-foreground" />}
          {theme === 'dark' && <Moon size={18} className="text-foreground" />}
          {theme === 'cool' && <Droplet size={18} className="text-foreground" />}
          {theme === 'warm' && <FlameIcon size={18} className="text-foreground" />}
          {theme === 'matcha' && <Leaf size={18} className="text-foreground" />}
          {theme === 'sakura' && <Cherry size={18} className="text-foreground" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun size={16} className="mr-2" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon size={16} className="mr-2" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('cool')}>
          <Droplet size={16} className="mr-2" />
          <span>Calm Blue</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('warm')}>
          <FlameIcon size={16} className="mr-2" />
          <span>Warm Orange</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('matcha')}>
          <Leaf size={16} className="mr-2" />
          <span>Matcha</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('sakura')}>
          <Cherry size={16} className="mr-2" />
          <span>Sakura</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 