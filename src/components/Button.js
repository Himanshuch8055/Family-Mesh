import { useThemeClass } from '@/hooks/useThemeClass';

export function Button({ children, variant = 'primary', ...props }) {
  const { getThemeClass } = useThemeClass();
  
  const buttonClass = variant === 'primary' 
    ? getThemeClass('buttonPrimary')
    : getThemeClass('buttonSecondary');

  return (
    <button 
      className={`px-4 py-2 rounded-lg transition-colors ${buttonClass}`}
      {...props}
    >
      {children}
    </button>
  );
} 