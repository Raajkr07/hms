import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from './AdminSidebar';
import Footer from '../../components/footer/SocialFooter';
import { overviewCards, } from './data/Data';
import {
  overviewData,
  recentSalesData,
  topProducts,
  Star,
  PencilLine,
  Trash,
} from './data/Data';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useMantineTheme } from '@mantine/core';

const AdminDashboard = () => {
  const { theme } = useMantineTheme();
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
        {/* Sidebar */}
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
          style={{ marginLeft: getSidebarWidth(), height: 'auto' }}
        >
          <div
            className="h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)] 
                       overflow-y-auto overflow-x-hidden px-4 sm:px-6 pb-6"
            onScroll={handleMainScroll}
            style={{
              overflowY: scrollingArea === 'sidebar' ? 'hidden' : 'auto',
              height: '100%',
            }}
          >
            {/* Dashboard Title */}
            <h1 className="text-3xl font-bold text-primary-500 dark:text-slate-50 mb-6">Dashboard</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {overviewCards.map(({ icon, title, value, change, color }, i) => (
                <div
                  key={i}
                  className="card bg-slate-100 dark:bg-slate-950 rounded-lg shadow-sm transition-colors duration-300"
                >
                  <div className="card-header flex items-center gap-3 p-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600`}
                    >
                      <span className="text-xl">{icon}</span>
                    </div>
                    <p className="card-title font-semibold text-slate-700 dark:text-slate-200">{title}</p>
                  </div>
                  <div className="card-body px-4 pb-4">
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border border-blue-500 px-3 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600 mt-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      {change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* New Dashboard Sections */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mb-6">
              {/* Overview Chart */}
              <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                <div className="card-header">
                  <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Overview</p>
                </div>
                <div className="card-body p-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={overviewData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} formatter={(value) => `$${value}`} />
                      <XAxis
                        dataKey="name"
                        strokeWidth={0}
                        stroke={theme === 'light' ? '#475569' : '#94a3b8'}
                        tickMargin={6}
                      />
                      <YAxis
                        dataKey="total"
                        strokeWidth={0}
                        stroke={theme === 'light' ? '#475569' : '#94a3b8'}
                        tickFormatter={(value) => `$${value}`}
                        tickMargin={6}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#2563eb"
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Sales */}
              <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                <div className="card-header">
                  <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Recent Sales</p>
                </div>
                <div className="card-body h-[300px] overflow-auto p-0">
                  {recentSalesData.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center justify-between gap-x-4 py-2 pr-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
                    >
                      <div className="flex items-center gap-x-4">
                        <img
                          src={sale.image}
                          alt={sale.name}
                          className="w-10 h-10 flex-shrink-0 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-y-1">
                          <p className="font-medium text-slate-900 dark:text-slate-50">{sale.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{sale.email}</p>
                        </div>
                      </div>
                      <p className="font-medium text-slate-900 dark:text-slate-50">${sale.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Orders Table */}
            <div className="card">
              <div className="card-header">
                <p className="card-title text-lg font-semibold text-slate-700 dark:text-slate-200">Top Orders</p>
              </div>
              <div className="card-body p-0">
                <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                  <table className="table w-full border-collapse border border-slate-200 dark:border-slate-700 text-sm">
                    <thead className="table-header bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 sticky top-0 z-10">
                      <tr>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700 text-left">#</th>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700 text-left">Product</th>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Price</th>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Status</th>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Rating</th>
                        <th className="table-head px-4 py-2 border border-slate-300 dark:border-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.number} className="table-row border-b border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800">
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700">{product.number}</td>
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700">
                            <div className="flex items-center gap-x-4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 rounded-lg object-cover"
                              />
                              <div className="flex flex-col">
                                <p className="font-semibold text-slate-900 dark:text-slate-50">{product.name}</p>
                                <p className="text-sm font-normal text-slate-600 dark:text-slate-400">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">${product.price}</td>
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">{product.status}</td>
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-x-1 text-yellow-600">
                              <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
                              {product.rating}
                            </div>
                          </td>
                          <td className="table-cell px-4 py-2 border border-slate-300 dark:border-slate-700 text-center">
                            <div className="flex items-center justify-center gap-x-4">
                              <button className="text-blue-500 dark:text-blue-600" aria-label="Edit product">
                                <PencilLine size={20} />
                              </button>
                              <button className="text-red-500" aria-label="Delete product">
                                <Trash size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Content Outlet */}
            <Outlet />

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
