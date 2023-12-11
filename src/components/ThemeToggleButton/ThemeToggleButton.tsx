import { themeStore } from '../ThemeStore/ThemeStore.tsx'; 

const ThemeToggleButton = () => {
  return (
    <button 
      className="theme-toggle-button" 
      onClick={() => themeStore.toggleTheme()}
    >
      {themeStore.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeToggleButton;
