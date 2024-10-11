import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('default');

  // Apply theme based on the selected option
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Default case: match the device's system theme
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  };

  // Handle theme toggle
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Effect to set the initial theme based on saved preference or system settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default'; // Default to system preference
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Effect to save the theme to localStorage whenever it changes
  useEffect(() => {
    if (theme !== 'default') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme'); // Don't store default to allow system preference changes
    }
  }, [theme]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <select
        id="theme-selector"
        value={theme}
        onChange={handleThemeChange}
        className="bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-800 p-2 rounded-lg shadow focus:outline-none focus:ring-0 focus:border-none transition-colors"
      >
        <option value="default">Default (System)</option>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;