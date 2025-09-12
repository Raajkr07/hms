import React, { useState, useRef, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from './AdminSidebar';
import SocialFooter from '../../components/footer/SocialFooter';

import { sidebarItems,  statsData, recentActivity } from './data/DashboardData';
import { useMantineTheme } from '@mantine/core';

import {
  Clock,
  UserPlus,
  Package,
  Handshake,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const StatCard = ({ stat }) => {
  const colorClasses = {
    blue: 'bg-blue-500 dark:bg-blue-600',
    green: 'bg-green-500 dark:bg-green-600',
    purple: 'bg-purple-500 dark:bg-purple-600',
    emerald: 'bg-emerald-500 dark:bg-emerald-600',
    orange: 'bg-orange-500 dark:bg-orange-600',
    red: 'bg-red-500 dark:bg-red-600'
  };

  const bgColorClasses = {
    blue: 'bg-blue-100 border border-blue-300 dark:bg-blue-900 dark:border-blue-800',
    green: 'bg-green-100 border border-green-300 dark:bg-green-900 dark:border-green-800',
    purple: 'bg-purple-100 border border-purple-300 dark:bg-purple-900 dark:border-purple-800',
    emerald: 'bg-emerald-100 border border-emerald-300 dark:bg-emerald-900 dark:border-emerald-800',
    orange: 'bg-orange-100 border border-orange-300 dark:bg-orange-900 dark:border-orange-800',
    red: 'bg-red-100 border border-red-300 dark:bg-red-900 dark:border-red-800'
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${bgColorClasses[stat.color]} hover:shadow-lg transition-all duration-300 group`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p
              className={`text-sm font-medium text-gray-600 dark:text-gray-400 mb-1`}
            >
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </p>
            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up'
                    ? 'bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-300'
                    : 'bg-red-200 dark:bg-red-700 text-red-700 dark:text-red-300'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{stat.period}</span>
            </div>
          </div>
          <div
            className={`${colorClasses[stat.color]} p-3 rounded-xl shadow-lg flex items-center justify-center`}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  const statusColorsLight = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    urgent: 'bg-red-500',
    info: 'bg-blue-500'
  };
  const statusColorsDark = {
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    urgent: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const isDark = document.documentElement.classList.contains('dark');
  const statusColors = isDark ? statusColorsDark : statusColorsLight;

  const avatarBg = isDark
    ? 'bg-gradient-to-br from-purple-700 to-pink-700'
    : 'bg-gradient-to-br from-purple-400 to-pink-500';

  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-900 dark:hover:bg-gray-900 transition-all duration-300 group">
      <div className="relative">
        <div
          className={`${avatarBg} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
        >
          {activity.avatar}
        </div>
        <div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${statusColors[activity.status]} border-2 border-gray-300 dark:border-gray-900`}
        ></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {activity.title}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 line-clamp-2">
          {activity.description}
        </p>
        <p className="text-gray-700 dark:text-gray-500 text-xs mt-2 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {activity.time}
        </p>
      </div>
    </div>
  );
};

const QuickActionCard = ({ icon: Icon, title, description, color, onClick }) => {
  const colorClassesLight = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    emerald: 'from-emerald-400 to-emerald-600'
  };
  const colorClassesDark = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700',
    emerald: 'from-emerald-600 to-emerald-700'
  };

  const isDark = document.documentElement.classList.contains('dark');
  const colorClasses = isDark ? colorClassesDark : colorClassesLight;

  const bgClass = isDark ? 'bg-white/10' : 'bg-white/30';
  const borderClass = isDark ? 'border-white/20' : 'border-gray-300';

  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-2xl ${bgClass} border ${borderClass} hover:bg-white/20 dark:hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group hover:scale-105`}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 mx-auto shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{description}</p>
    </button>
  );
};


const AdminDashboard = (props) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);

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
  // You may want to pass your header, sidebar props to keep their internal state sync
  // For example active section or collapse toggling callbacks

  return (
    <div className={`min-h-screen mt-16 transition-all duration-300 bg-white dark:bg-black `}>
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
      <div className="flex">
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

        <main className={`flex-1 transition-all duration-300 p-6 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Main dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Recent Activity */}
            <div className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
              </div>
              <div className="p-6 space-y-2">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                <QuickActionCard
                  icon={UserPlus}
                  title="Add Doctor"
                  description="Register new healthcare professional"
                  color="blue"
                  onClick={() => setActiveSection('doctors')}
                />
                <QuickActionCard
                  icon={Package}
                  title="Manage Inventory"
                  description="Update medical supplies stock"
                  color="green"
                  onClick={() => setActiveSection('inventory')}
                />
                <QuickActionCard
                  icon={Handshake}
                  title="Process Requests"
                  description="Review and approve pending requests"
                  color="purple"
                  onClick={() => setActiveSection('requests')}
                />
                <QuickActionCard
                  icon={BarChart3}
                  title="View Analytics"
                  description="Access detailed performance metrics"
                  color="orange"
                  onClick={() => setActiveSection('analytics')}
                />
              </div>
            </div>

          </div>

          <SocialFooter />

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
