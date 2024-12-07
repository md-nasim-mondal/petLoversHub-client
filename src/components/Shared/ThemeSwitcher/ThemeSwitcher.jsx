import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    } else {
      return 'default'; // Default system-based theme
    }
  });

  // Apply theme to the document
  const applyTheme = (currentTheme) => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // System-based theme
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

  // Handle theme change
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  // Effect to apply theme on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);

    if (theme === 'default') {
      localStorage.removeItem('theme'); // Don't store system-based preference
    } else {
      localStorage.setItem('theme', theme);
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