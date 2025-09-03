import React, { useState, useEffect, useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoonStars, IconChevronCompactDown } from '@tabler/icons-react';
import LogoButton from '../header/LogoButton';
import { useTheme } from '../../hooks/UseTheme';
import { Link, useNavigate } from 'react-router-dom';

const LandingHeader = ({ onLogoClick }) => {
  const { toggleColorScheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    else document.removeEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[60px] sm:h-[70px] flex justify-between items-center px-3 sm:px-6 transition-all duration-300 ease-in-out ${
        scrolled ? 'shadow-lg border-b border-neutral-200 dark:border-neutral-700' : ''
      }`}
      style={{ backgroundColor: isDark ? '#000000' : 'white' }}
      role="banner"
    >
      <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
        <div
          onClick={onLogoClick}
          aria-label="Go to Hero Section"
          role="button"
          tabIndex={0}
          className="flex items-center cursor-pointer select-none bg-transparent border-0 flex-shrink-0"
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onLogoClick();
            }
          }}
        >
          <LogoButton />
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 items-center ml-3 sm:ml-6 flex-shrink-0">
        {/* Dropdown Menu */}
        <div
          className="relative group"
          ref={menuRef}
          onMouseEnter={() => setMenuOpen(true)}
          onFocus={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
          tabIndex={0}
        >
          <button
            type="button"
            className="flex items-center justify-center pt-8 h-[36px] w-[36px] sm:w-[42px] sm:h-[42px] rounded-lg bg-transparent hover:bg-white dark:hover:bg-black transition-all duration-200"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Donation Options"
            onClick={() => setMenuOpen(m => !m)}
          >
            <IconChevronCompactDown
              size={26}
              className={`
                transition-all duration-300
                ${menuOpen ? '-rotate-180' : 'rotate-0'}
                text-primary-500
              `}
            />
          </button>

          {/* Dropdown Content */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl shadow-2xl border border-white dark:border-black py-3 z-40 animate-fadeIn"
              role="menu"
              tabIndex={-1}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <Link
                to="/money"
                className="block px-6 py-3 text-black dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 hover:text-primary-600 dark:hover:text-primary-400 font-medium rounded-t-xl transition no-underline"
                role="menuitem"
                tabIndex={0}
                onClick={() => setMenuOpen(false)}
              >
                Donate Money
              </Link>
              <Link
                to="/medicine"
                className="block px-6 py-3 text-black dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 hover:text-primary-600 dark:hover:text-primary-400 font-medium rounded-b-xl transition no-underline"
                role="menuitem"
                tabIndex={0}
                onClick={() => setMenuOpen(false)}
              >
                Donate Medicine
              </Link>
            </div>
          )}
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 h-[36px] sm:h-[42px] no-underline"
        >
          Login
        </Link>
        {/* Theme Button */}
        <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="Toggle dark mode"
          className="h-[36px] w-[36px] sm:h-[42px] sm:w-[42px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          style={{ backgroundColor: 'transparent' }}
        >
          {isDark ? (
            <IconSun size={18} stroke={1.5} className="text-yellow-500 sm:w-5 sm:h-5" />
          ) : (
            <IconMoonStars size={18} stroke={1.5} className="text-blue-600 sm:w-5 sm:h-5" />
          )}
        </ActionIcon>
      </div>
    </header>
  );
};

export default LandingHeader;