import { useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  
  useEffect(() => {
    const html = document.documentElement;
    
    if (colorScheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [colorScheme]);
  
  return {
    colorScheme,
    setColorScheme,
    isDark: colorScheme === 'dark',
    toggleColorScheme: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  };
};
