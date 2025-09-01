import React, { useState, useEffect } from 'react';
import { ActionIcon, Indicator, useMantineTheme } from '@mantine/core';
import { IconBellRinging, IconSun, IconMoonStars, IconSearch } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import LogoButton from './LogoButton';
import { useTheme } from '../../hooks/UseTheme';

const Header = ({ sidebarCollapsed, onToggleSidebar, onLogoHoverEnter, onLogoHoverLeave }) => {
  const { toggleColorScheme, isDark } = useTheme();
  const theme = useMantineTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const inputStyles = {
    backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'white',
    backdropFilter: 'blur(10px)',
    border: theme.colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #ced4da',
    borderRadius: 12,
    color: theme.colorScheme === 'dark' ? '#e0e0e0' : '#333',
    fontSize: 16,
    padding: '12px 14px 12px 36px',
    height: 40,
    transition: 'all 0.3s ease',
    boxShadow: searchFocused
      ? `0 0 20px ${theme.colors[theme.primaryColor][3]}`
      : 'none',
    borderColor: searchFocused
      ? theme.colors[theme.primaryColor][5]
      : theme.colorScheme === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : '#ced4da',
    outline: 'none',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[60px] sm:h-[70px] lg:h-[70px] flex justify-between items-center px-2 sm:px-3 lg:px-6 transition-all duration-300 ease-in-out ${
        scrolled ? 'shadow-lg border-b border-neutral-200 dark:border-neutral-700' : ''
      }`}
      style={{ backgroundColor: isDark ? '#08090C' : 'white' }}
      role="banner"
    >
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 flex-1 min-w-0"
      onMouseEnter={onLogoHoverEnter} 
      onMouseLeave={onLogoHoverLeave}
      style={{ userSelect: 'none' }}
      >
        <LogoButton sidebarCollapsed={sidebarCollapsed} onToggleSidebar={onToggleSidebar} />

        <div className="hidden sm:flex flex-1 max-w-xs md:max-w-md relative">
          <IconSearch
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="search"
            style={inputStyles}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search patients, doctors, appointments"
          />
        </div>
      </div>

      <div className="flex gap-1 sm:gap-2 lg:gap-4 items-center ml-2 sm:ml-4 lg:ml-6">
        <div className="sm:hidden">
          <ActionIcon
            variant="subtle"
            size="sm"
            aria-label="Search"
            className="h-[36px] w-[36px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            style={{ backgroundColor: 'transparent' }}
          >
            <IconSearch size={18} stroke={1.5} className="text-neutral-600 dark:text-neutral-400" />
          </ActionIcon>
        </div>

        <Link to="/logout" className="no-underline">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 h-[32px] sm:h-[36px] lg:h-[42px] flex items-center cursor-pointer no-underline whitespace-nowrap">
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Logout</span>
          </button>
        </Link>

        <Indicator inline size={6} sm:size={8} offset={5} sm:offset={7} position="top-end" color="red" processing>
          <ActionIcon
            variant="subtle"
            size="sm"
            aria-label="Notifications"
            className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] lg:h-[42px] lg:w-[42px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            style={{ backgroundColor: 'transparent' }}
          >
            <IconBellRinging size={16} sm:size={18} lg:size={20} stroke={1.5} className="text-neutral-600 dark:text-neutral-400" />
          </ActionIcon>
        </Indicator>

        <ActionIcon
          variant="subtle"
          size="sm"
          onClick={toggleColorScheme}
          aria-label="Toggle dark mode"
          className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px] lg:h-[42px] lg:w-[42px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          style={{ backgroundColor: 'transparent' }}
        >
          {isDark ? (
            <IconSun size={16} sm:size={18} lg:size={20} stroke={1.5} className="text-yellow-500" />
          ) : (
            <IconMoonStars size={16} sm:size={18} lg:size={20} stroke={1.5} className="text-blue-600" />
          )}
        </ActionIcon>

        <div className="flex items-center h-[32px] sm:h-[36px] lg:h-[42px]">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;