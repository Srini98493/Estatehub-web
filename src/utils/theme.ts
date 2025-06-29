export const updateTheme = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.style.setProperty('--color-bg-primary', '#1F2937');
    root.style.setProperty('--color-bg-secondary', '#111827');
    root.style.setProperty('--color-bg-tertiary', '#374151');
    root.style.setProperty('--color-text-primary', '#F9FAFB');
    root.style.setProperty('--color-text-secondary', '#D1D5DB');
    root.style.setProperty('--color-text-tertiary', '#9CA3AF');
    root.style.setProperty('--color-border', '#374151');
    root.style.setProperty('--color-border-hover', '#4B5563');
  } else {
    root.style.setProperty('--color-bg-primary', '#FFFFFF');
    root.style.setProperty('--color-bg-secondary', '#F9FAFB');
    root.style.setProperty('--color-bg-tertiary', '#F3F4F6');
    root.style.setProperty('--color-text-primary', '#111827');
    root.style.setProperty('--color-text-secondary', '#4B5563');
    root.style.setProperty('--color-text-tertiary', '#9CA3AF');
    root.style.setProperty('--color-border', '#E5E7EB');
    root.style.setProperty('--color-border-hover', '#D1D5DB');
  }
};