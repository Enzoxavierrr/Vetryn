// Vetryn Brand Colors
export const vetrynColors = {
  primary: '#12462d',
  primaryContent: '#7addad',
  primaryLight: '#1c6f47',
  primaryDark: '#081d13',
} as const;

// Export for easy use in components
export const colors = {
  vetryn: vetrynColors,
  
  // Tailwind default colors (if needed)
  background: '#ffffff',
  foreground: 'oklch(0.145 0 0)',
  card: '#ffffff',
  cardForeground: 'oklch(0.145 0 0)',
  border: 'rgba(0, 0, 0, 0.1)',
  muted: '#ececf0',
  mutedForeground: '#717182',
} as const;
