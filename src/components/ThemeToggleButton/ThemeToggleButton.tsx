import { observer } from 'mobx-react-lite';
import { themeStore } from '../ThemeStore/ThemeStore';
import './ThemeToggleButton.css';

const ThemeToggleButton = () => {
  const isDarkMode = themeStore.theme === 'dark';

  const toggleTheme = () => {
    themeStore.toggleTheme();
  };

  return (
    <button 
      className={`theme-toggle-button ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={toggleTheme}
    >
      <span className="toggle-icon sun">🌞</span>
      <div className={`slider ${isDarkMode ? 'dark-mode' : 'light-mode'}`}></div>
      <span className="toggle-icon moon">🌜</span>
    </button>
  );
};

export default observer(ThemeToggleButton);
