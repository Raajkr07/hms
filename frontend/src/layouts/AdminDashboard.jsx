import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Root container with dark background */}
      <div className="min-h-screen bg-white dark:bg-custom-dark transition-colors duration-300">
        {/* Header spans full width at top */}
        <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        {/* Sidebar below header */}
        <Sidebar collapsed={sidebarCollapsed} />
        
        {/* Overlay for mobile when sidebar is open */}
        {!sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden top-[75px]"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main content */}
        <main 
          className={`transition-all duration-300 ease-in-out pt-[75px] min-h-screen bg-white dark:bg-custom-dark ${
            !sidebarCollapsed ? 'lg:ml-64' : 'ml-0'
          }`}
        >
          <div className="overflow-auto">
            <Outlet />
            
            <div className="p-6">
              <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg mb-6 flex items-center justify-center transition-colors duration-300">
                <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">
                  Scroll down to see the demo modal (3 seconds of scrolling)
                </h2>
              </div>
              <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-neutral-700 dark:to-neutral-600 rounded-lg mb-6 flex items-center justify-center transition-colors duration-300">
                <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">Keep scrolling...</h2>
              </div>
              <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-neutral-600 dark:to-neutral-500 rounded-lg mb-6 flex items-center justify-center transition-colors duration-300">
                <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">Almost there...</h2>
              </div>
              <div className="h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-neutral-500 dark:to-neutral-400 rounded-lg flex items-center justify-center transition-colors duration-300">
                <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">Modal should appear after scrolling!</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
