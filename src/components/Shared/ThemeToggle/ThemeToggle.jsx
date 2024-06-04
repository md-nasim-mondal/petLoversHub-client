import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.getItem("color-theme") === "dark") {
      return true;
    } else if (
      !("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      id='theme-toggle'
      onClick={handleThemeToggle}
      className='p-2 rounded-full border-4 border-current dark:text-white'>
      <svg
        id='theme-toggle-dark-icon'
        className={`w-6 h-6 ${isDarkMode ? "hidden" : ""}`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12 3v1m6.364-1.364l-.707.707M18 12h1m-1.364 6.364l.707.707M12 18v1m-6.364-1.364l.707-.707M6 12H5m1.364-6.364l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z'></path>
      </svg>
      <svg
        id='theme-toggle-light-icon'
        className={`w-6 h-6 ${isDarkMode ? "" : "hidden"}`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M20.354 15.354A9 9 0 118.646 3.646 9 9 0 0020.354 15.354z'></path>
      </svg>
    </button>
  );
};

export default ThemeToggle;
