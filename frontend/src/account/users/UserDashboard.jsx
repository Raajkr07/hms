import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from './UserSidebar';
import Footer from '../../components/footer/SocialFooter';

import OverviewCards from '../dashboardComponents/OverviewCard';
import OverviewChartRecentDonations from '../dashboardComponents/OverviewChartRecentDonations';
import TopOrdersTable from '../dashboardComponents/TopOrdersTable';

import {
  overviewCards,
  overviewData,
  recentDonationData,
  topProducts,
  Star,
  PencilLine,
  Trash,
} from './data/UserData';

import { useMantineTheme } from '@mantine/core';

const UserDashboard = () => {
  const { colorScheme: theme } = useMantineTheme();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [scrollingArea, setScrollingArea] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
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
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          collapsed={!isSidebarOpen}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          freezeScroll={scrollingArea === 'main'}
          className="fixed left-0 z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700
                    w-16 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out
                    sm:w-64 lg:w-64
                    top-[60px] sm:top-[70px] lg:top-[70px]
                    h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]"
        />
        {isMobile && !sidebarCollapsed && (
          <div
            className="fixed left-0 right-0 z-20 bg-black/50
                       top-[60px] sm:top-[70px] lg:top-[70px]
                       h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]"
            onClick={handleOverlayClick}
            aria-label="Close sidebar"
          />
        )}
        <main
          className={`flex-1 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out overflow-hidden
                      mt-[60px] sm:mt-[70px] lg:mt-[70px]`}
          style={{ marginLeft: getSidebarWidth(), height: 'auto' }}
        >
          <div
            className="h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden px-4 sm:px-6 pb-6"
            onScroll={handleMainScroll}
            style={{
              overflowY: scrollingArea === 'sidebar' ? 'hidden' : 'auto',
              height: '100%',
            }}
          >

            <OverviewCards overviewCards={overviewCards} />
            <OverviewChartRecentDonations
              overviewData={overviewData}
              recentSalesData={recentDonationData}
              theme={theme}
            />
            <TopOrdersTable
              topProducts={topProducts}
              Star={Star}
              PencilLine={PencilLine}
              Trash={Trash}
            />
            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
