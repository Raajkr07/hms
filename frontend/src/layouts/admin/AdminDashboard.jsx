import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [scrollingArea, setScrollingArea] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const isSidebarOpen = !sidebarCollapsed || logoHovered || sidebarHovered;
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarScroll = (e) => {
    e.stopPropagation();
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    setScrollingArea('sidebar');
    scrollTimeoutRef.current = setTimeout(() => setScrollingArea(null), 300);
  };

  const handleMainScroll = (e) => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    setScrollingArea('main');
    scrollTimeoutRef.current = setTimeout(() => setScrollingArea(null), 300);
  };

  const handleOverlayClick = () => {
    if (isMobile) setSidebarCollapsed(true);
  };

  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, sidebarCollapsed]);

  const getSidebarWidth = () => (isMobile ? 0 : sidebarCollapsed ? 64 : 256);

  return (
    <div className="min-h-screen bg-white dark:bg-custom-dark flex flex-col transition-colors duration-300">
      <Header 
      onToggleSidebar={toggleSidebar} 
      sidebarCollapsed={sidebarCollapsed} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          collapsed={!isSidebarOpen}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          freezeScroll={scrollingArea === 'main'}
          style={{
            top: undefined, // handled by tailwind
            height: undefined // handled by tailwind
          }}
          className="fixed left-0 z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700
                      w-16 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out
                      sm:w-64 lg:w-64
                      top-[60px] sm:top-[70px] lg:top-[70px]
                      h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]"
        />

        {/* Mobile Overlay */}
        {isMobile && !sidebarCollapsed && (
          <div
            className="fixed left-0 right-0 z-20 bg-black/50
            top-[60px] sm:top-[70px] lg:top-[70px]
            h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]"
            onClick={handleOverlayClick}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main
          className={`flex-1 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out overflow-hidden
                      mt-[60px] sm:mt-[70px] lg:mt-[70px]`}
          style={{
            marginLeft: getSidebarWidth(),
            height: "auto"
          }}
        >
          <div
            className="h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden"
            onScroll={handleMainScroll}
            style={{
              overflowY: scrollingArea === 'sidebar' ? 'hidden' : 'auto',
              height: '100%',
            }}
          >
            <div className="min-h-full">
              <Outlet />
              {/* Demo Content */}
              <div className="p-4 sm:p-6 space-y-6">
                <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <div className="text-center px-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">
                      Scroll down to see the demo modal (3 seconds of scrolling)
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-2">
                      Sidebar: {sidebarCollapsed ? 'Collapsed' : 'Expanded'} | Device: {isMobile ? 'Mobile' : 'Desktop'}
                    </p>
                  </div>
                </div>
                {/* Demo Content */}
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <div className="text-center px-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline">
                        Scroll down to see the demo modal (3 seconds of scrolling)
                      </h2>
                      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mt-2">
                        Sidebar: {sidebarCollapsed ? 'Collapsed' : 'Expanded'} | Device: {isMobile ? 'Mobile' : 'Desktop'}
                      </p>
                    </div>
                  </div>

                  <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-neutral-700 dark:to-neutral-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline px-4 text-center">
                      Keep scrolling...
                    </h2>
                  </div>

                  <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-neutral-600 dark:to-neutral-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline px-4 text-center">
                      Almost there...
                    </h2>
                  </div>

                  <div className="h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-neutral-500 dark:to-neutral-400 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline px-4 text-center">
                      Modal should appear after scrolling!
                    </h2>
                  </div>

                  {/* Additional content to test scrolling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="h-32 sm:h-40 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-neutral-700 dark:to-neutral-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                      >
                        <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                          Card {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 dark:from-neutral-600 dark:to-neutral-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 no-underline px-4 text-center">
                      End of demo content
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;