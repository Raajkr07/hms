import React, { useState, useEffect } from 'react';
import Header from '../../../components/header/Header';
import Sidebar from '../DoctorSidebar';
import Footer from '../../../components/footer/SocialFooter';
import { UserCheck, MessageSquare, Heart, BarChart2 } from 'lucide-react';

const AnalyticsPage = () => {
  // Mock data for analytics - replace with API calls
  const [analyticsData, setAnalyticsData] = useState({
    totalPatientsChecked: 128,
    totalDonationsReviewed: 56,
    totalRequestsReviewed: 44,
    positiveFeedbackCount: 95,
    neutralFeedbackCount: 20,
    negativeFeedbackCount: 13,
    feedbacks: [
      { id: 1, patientName: 'Ravi Kumar', comment: 'Great consultation and care', rating: 5 },
      { id: 2, patientName: 'Anjali Singh', comment: 'Helpful and understanding', rating: 4 },
      { id: 3, patientName: 'Mukesh Kumar', comment: 'Satisfactory service', rating: 3 },
      { id: 4, patientName: 'Seema K', comment: 'Had to wait longer than expected', rating: 2 },
      { id: 5, patientName: 'Sunil Patil', comment: 'Not very responsive.', rating: 1 },
    ],
  });

  // Responsive sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scrollingArea, setScrollingArea] = React.useState(null);
  const scrollTimeoutRef = React.useRef(null);

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

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const isSidebarOpen = !sidebarCollapsed || logoHovered || sidebarHovered;

  // Helper for star rating display
  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${
            i <= count ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.372 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.95c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.043 9.377c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={!isSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar
          collapsed={!isSidebarOpen}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          freezeScroll={scrollingArea === 'main'}
          className="fixed left-0 z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out w-16 sm:w-64 lg:w-64 top-[60px] sm:top-[70px] lg:top-[70px] h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-70px)]"
        />

        <main
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'ml-16 sm:ml-64 lg:ml-64' : 'ml-16 sm:ml-16 lg:ml-16'
          }`}
          onScroll={handleMainScroll}
          style={{ height: 'auto' }}
        >
          <h1 className="text-4xl pt-10 font-bold text-primary-600 dark:text-primary-400 mb-8">Doctor Analytics Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 p-6 bg-blue-50 dark:bg-blue-900 rounded-xl shadow-md">
              <UserCheck className="w-12 h-12 text-blue-600" />
              <div>
                <p className="text-3xl font-extrabold text-blue-800 dark:text-blue-300">{analyticsData.totalPatientsChecked}</p>
                <p className="text-blue-700 dark:text-blue-400 font-semibold">Patients Checked</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-900 rounded-xl shadow-md">
              <Heart className="w-12 h-12 text-green-600" />
              <div>
                <p className="text-3xl font-extrabold text-green-800 dark:text-green-300">{analyticsData.totalDonationsReviewed}</p>
                <p className="text-green-700 dark:text-green-400 font-semibold">Donations Reviewed</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-md">
              <MessageSquare className="w-12 h-12 text-yellow-600" />
              <div>
                <p className="text-3xl font-extrabold text-yellow-800 dark:text-yellow-300">{analyticsData.totalRequestsReviewed}</p>
                <p className="text-yellow-700 dark:text-yellow-400 font-semibold">Requests Reviewed</p>
              </div>
            </div>
          </div>

          {/* Feedback Summary */}
          <section className="mb-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">User Feedback Summary</h2>
            <div className="flex gap-6">
              <div className="flex-1 bg-green-100 dark:bg-green-800 rounded-xl p-4 text-green-700 dark:text-green-300 text-center">
                <p className="text-4xl font-extrabold">{analyticsData.positiveFeedbackCount}</p>
                <p className="font-semibold">Positive Feedbacks</p>
              </div>
              <div className="flex-1 bg-yellow-100 dark:bg-yellow-800 rounded-xl p-4 text-yellow-700 dark:text-yellow-300 text-center">
                <p className="text-4xl font-extrabold">{analyticsData.neutralFeedbackCount}</p>
                <p className="font-semibold">Neutral Feedbacks</p>
              </div>
              <div className="flex-1 bg-red-100 dark:bg-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 text-center">
                <p className="text-4xl font-extrabold">{analyticsData.negativeFeedbackCount}</p>
                <p className="font-semibold">Negative Feedbacks</p>
              </div>
            </div>
          </section>

          {/* Recent Feedbacks */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Recent User Feedbacks</h2>
            <div className="space-y-6 max-w-4xl">
              {analyticsData.feedbacks.map(({ id, patientName, comment, rating }) => (
                <div
                  key={id}
                  className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-lg text-primary-600 dark:text-primary-400">{patientName}</p>
                    <div>{renderStars(rating)}</div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
