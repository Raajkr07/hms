import React, { useState, useRef, useEffect } from 'react';
import { useMantineTheme } from '@mantine/core';

import Header from '../../../components/header/Header';
import Sidebar from '../UserSidebar';
import Footer from '../../../components/footer/SocialFooter';
import DonationComponent from '../../../pages/donation/component/MoneyDonation';

const MoneyDonationPage = () => {
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

  const submitDonation = async (amount, formData) => {
    const response = await fetch('https://razorpay.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, ...formData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Donation failed');
    }
    return await response.json();
  };

  const isSidebarVisible = isSidebarOpen || sidebarHovered;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={!isSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar
          collapsed={!isSidebarVisible}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          freezeScroll={scrollingArea === 'main'}
          className={`fixed left-0 z-30 shadow-xl border-r border-white dark:border-neutral-700
                    w-16 bg-white dark:bg-black transition-all duration-300 ease-in-out
                    sm:w-64 lg:w-64
                    top-[60px] sm:top-[70px] lg:top-[70px]
                    h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]`}
        />
        <main
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${
            isSidebarVisible ? 'ml-16 sm:ml-64 lg:ml-64' : 'ml-16 sm:ml-16 lg:ml-16'
          }`}
          onScroll={handleMainScroll}
          style={{ height: 'auto' }}
        >
          <DonationComponent onSubmit={submitDonation} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MoneyDonationPage;
