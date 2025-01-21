import { useTheme } from '@/context/ThemeContext';
import { themeConfig } from '@/utils/themeConfig';

export function useThemeClass() {
  const { theme } = useTheme();
  
  const getThemeClass = (type) => {
    return themeConfig[theme][type];
  };

  return { getThemeClass, theme };
} 