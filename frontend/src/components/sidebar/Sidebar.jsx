import React from 'react';
import { IconLayoutGridFilled, IconStethoscope, IconWheelchair, IconCalendarClock, IconMedicineSyrup } from '@tabler/icons-react';
import avatarImage from '../../assets/Avatar.jpg';
import { Avatar } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const links = [
  {
    name: "Dashboard", 
    url: "/dashboard", 
    icon: <IconLayoutGridFilled stroke={1.5} />
  },
  {
    name: "Doctors", 
    url: "/doctors", 
    icon: <IconStethoscope stroke={1.5} />
  },
  {
    name: "Patients", 
    url: "/patients", 
    icon: <IconWheelchair stroke={1.5} />
  },
  {
    name: "Appointments", 
    url: "/appointments", 
    icon: <IconCalendarClock stroke={1.5} />
  },
  {
    name: "Pharmacy", 
    url: "/pharmacy", 
    icon: <IconMedicineSyrup stroke={1.5} />
  },
];

const Sidebar = ({ collapsed = false }) => {
  return (
    <aside 
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-white dark:bg-custom-dark flex flex-col gap-8 items-center pt-6 transition-all duration-300 ease-in-out fixed left-0 top-[75px] bottom-0 z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700 ${
        collapsed ? 'translate-x-[-100%]' : 'translate-x-0'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* User Profile Section */}
      <div className={`flex flex-col justify-center gap-3 items-center ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className="relative">
          <div className="p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full shadow-lg">
            <Avatar 
              variant="filled" 
              src={avatarImage} 
              size={collapsed ? 30 : 42} 
              alt="User Avatar"
              className="ring-2 ring-primary-400/20"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-custom-dark rounded-full"></div>
        </div>
        
        {!collapsed && (
          <div className="text-center">
            <div className="text-neutral-900 dark:text-white font-medium text-base no-underline">Raj Kumar</div>
            <div className="text-neutral-600 dark:text-neutral-300 font-normal text-sm no-underline">Admin</div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`flex flex-col gap-2 w-full ${collapsed ? 'px-2' : 'px-4'}`}>
        {links.map((link) => (
          <NavLink 
            to={link.url} 
            key={link.url} 
            className={({ isActive }) => `
              flex items-center gap-3 w-full font-medium py-3 px-4 rounded-xl 
              transition-all duration-200 cursor-pointer no-underline
              ${isActive 
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25" 
                : "text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              } 
              ${collapsed ? 'justify-center' : ''}
              focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-custom-dark
            `}
            style={{ textDecoration: 'none' }}
            title={collapsed ? link.name : ''}
            aria-label={link.name}
          > 
            <span className="flex-shrink-0">
              {link.icon}
            </span>
            {!collapsed && (
              <span className="font-medium text-sm no-underline">{link.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto pb-6">
        {!collapsed && (
          <div className="text-center text-neutral-500 dark:text-neutral-400 text-xs no-underline">
            © 2025 HopeMeds
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
