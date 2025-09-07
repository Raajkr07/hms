import React from 'react';
import { IconHeartbeat } from '@tabler/icons-react';

const LogoButton = ({ sidebarCollapsed, onToggleSidebar }) => {
  return (
    <button
      type="button"
      onClick={onToggleSidebar}
      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded blinking-logo"
    >
      <IconHeartbeat size={40} stroke={2.5} className="text-primary-400" />
      <span className="font-heading text-3xl font-semibold tracking-tight text-primary-500 select-none no-underline">
        HopeMeds
      </span>
    </button>
  );
};

export default LogoButton;
