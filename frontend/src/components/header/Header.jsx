import React, { useState, useEffect } from 'react';
import { ActionIcon, Indicator } from '@mantine/core';
import { IconBellRinging, IconSun, IconMoonStars, IconSearch } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import LogoButton from './LogoButton';
import { useTheme } from '../../hooks/UseTheme';

const Header = ({ sidebarCollapsed, onToggleSidebar }) => {
  const { toggleColorScheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[75px] flex justify-between items-center px-6 transition-all duration-300 ease-in-out ${
        scrolled ? 'shadow-lg border-b border-neutral-200 dark:border-neutral-700' : ''
      }`}
      style={{ backgroundColor: isDark ? '#08090C' : 'white' }}
      role="banner"
    >
      <div className="flex items-center gap-6 flex-1">
        <LogoButton sidebarCollapsed={sidebarCollapsed} onToggleSidebar={onToggleSidebar} />

        <div className="flex-1 max-w-md relative">
          <IconSearch
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 h-[42px]"
            style={{
              backgroundColor: isDark ? '#374151' : '#f5f5f5',
              borderColor: isDark ? '#4b5563' : '#d1d5db',
              color: isDark ? 'white' : '#111827',
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 items-center ml-6">
        <Link to="/login" className="no-underline">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 h-[42px] flex items-center cursor-pointer no-underline">
            Login
          </button>
        </Link>

        <Indicator inline size={8} offset={7} position="top-end" color="red" processing>
          <ActionIcon
            variant="subtle"
            size="lg"
            aria-label="Notifications"
            className="h-[42px] w-[42px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            style={{ backgroundColor: 'transparent' }}
          >
            <IconBellRinging size={22} stroke={1.5} className="text-neutral-600 dark:text-neutral-400" />
          </ActionIcon>
        </Indicator>

        <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="Toggle dark mode"
          className="h-[42px] w-[42px] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          style={{ backgroundColor: 'transparent' }}
        >
          {isDark ? (
            <IconSun size={22} stroke={1.5} className="text-yellow-500" />
          ) : (
            <IconMoonStars size={22} stroke={1.5} className="text-blue-600" />
          )}
        </ActionIcon>

        <div className="flex items-center h-[42px]">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
