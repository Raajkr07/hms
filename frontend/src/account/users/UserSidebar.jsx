import React from 'react';
import {
  IconDashboard,
  IconUserCircle,
  IconCurrencyRupee,
  IconMedicineSyrup,
  IconClipboardHeart,
  IconPackage,
  IconCalendarBolt,
  IconSettings,
} from '@tabler/icons-react';

import avatarImage from '../../assets/user-avatar.png';
import { Avatar } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Dashboard', url: '/patient/dashboard', icon: <IconDashboard stroke={1.5} /> },
  { name: 'Profile', url: '/patient/profile', icon: <IconUserCircle stroke={1.5} /> },
  { name: 'Book Appointment', url: '/patient/bookappointment', icon: <IconCalendarBolt stroke={1.5} /> },
  { name: 'Donate Money', url: '/patient/money', icon: <IconCurrencyRupee stroke={1.5} /> },
  { name: 'Donate Medicine', url: '/patient/donate', icon: <IconMedicineSyrup stroke={1.5} /> },
  { name: 'Requests Medicine', url: '/patient/request', icon: <IconClipboardHeart stroke={1.5} /> },
  { name: 'Locations', url: '/patient/locations', icon: <IconPackage stroke={1.5} /> },
  { name: 'Setting', url: '/patient/settings', icon: <IconSettings stroke={1.5} /> },
];

const UserSidebar = ({ collapsed, onMouseEnter, onMouseLeave, onScroll, freezeScroll = false }) => {
  const handleSidebarScroll = (e) => {
    e.stopPropagation();
    if (onScroll) {
      onScroll(e);
    }
  };

  const scrollableStyles = {
    overflowY: freezeScroll ? 'hidden' : 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitScrollbar: { display: 'none' }
  };

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out fixed left-0 top-[60px] z-30 sm:top-[70px] lg:top-[70px] shadow-xl border-r border-neutral-200 dark:border-neutral-700 ${
        collapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
      }`}
      style={{ height: 'calc(100vh - 60px)' }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scrollable Content Container */}
      <div 
        className="flex flex-col h-full overflow-hidden"
        onScroll={handleSidebarScroll}
      >
        {/* Scrollable area */}
        <div 
          className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
          style={scrollableStyles}
        >
        {/* User Profile Section */}
        <div className={`flex flex-col justify-center gap-3 items-center py-4 flex-shrink-0 ${collapsed ? 'px-2' : 'px-4'}`}>
          <div className="relative">
            <div className="p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full shadow-lg">
              <Avatar
                variant="filled"
                src={avatarImage}
                size={collapsed ? 28 : 40}
                alt="User Avatar"
                className="ring-2 ring-primary-400/20"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-custom-dark rounded-full"></div>
          </div>

          {!collapsed && (
            <div className="text-center">
              <div className="text-neutral-900 dark:text-white font-medium text-sm no-underline">Raj Kumar</div>
              <div className="text-neutral-600 dark:text-neutral-300 font-normal text-xs no-underline">Admin</div>
            </div>
          )}
        </div>

        <nav className={`flex flex-col gap-1 flex-1 ${collapsed ? 'px-2' : 'px-4'}`}>
          {links.map((link) => (
            <NavLink
              to={link.url}
              key={link.url}
              className={({ isActive }) => `
                flex items-center gap-3 w-full font-medium py-2.5 px-3 rounded-lg 
                transition-all duration-200 cursor-pointer no-underline
                ${isActive
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'}
                ${collapsed ? 'justify-center' : ''}
                focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-custom-dark
              `}
              style={{ textDecoration: 'none' }}
              title={collapsed ? link.name : ''}
              aria-label={link.name}
            >
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{link.icon}</span>
              {!collapsed && <span className="font-medium text-sm no-underline overflow-hidden text-ellipsis whitespace-nowrap">{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pb-4 flex-shrink-0">
          {!collapsed && (
            <div className="text-center text-neutral-500 dark:text-neutral-400 text-xs no-underline px-4">© 2025 HopeMeds</div>
          )}
        </div>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;