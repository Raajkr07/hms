import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/header/Header';
import Sidebar from './DoctorSidebar';
import SocialFooter from '../../components/footer/SocialFooter';
import { ActivityIcon, UsersIcon, CalendarIcon, HeartIcon, ClockIcon, PhoneIcon } from 'lucide-react';

const DoctorDashboard = () => {
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
  const getSidebarWidth = () => (isMobile ? 0 : sidebarCollapsed ? 64 : 256);

  // Sample stat cards and data arrays exactly as before
  const statsCards = [
    { title: "Total Patients", value: "2,486", change: "+12%", icon: UsersIcon, color: "blue", trend: "up" },
    { title: "Today's Appointments", value: "24", change: "+3", icon: CalendarIcon, color: "green", trend: "up" },
    { title: "Active Cases", value: "186", change: "-5%", icon: ActivityIcon, color: "orange", trend: "down" },
    { title: "Recovery Rate", value: "94.2%", change: "+2.1%", icon: HeartIcon, color: "red", trend: "up" }
  ];
  const appointments = [
    { id: 1, patient: "Sarah Johnson", time: "09:00 AM", type: "Check-up", status: "Confirmed", avatar: "SJ" },
    { id: 2, patient: "Michael Brown", time: "10:30 AM", type: "Consultation", status: "Pending", avatar: "MB" },
    { id: 3, patient: "Emma Davis", time: "02:00 PM", type: "Follow-up", status: "Confirmed", avatar: "ED" },
    { id: 4, patient: "James Wilson", time: "03:30 PM", type: "Emergency", status: "Urgent", avatar: "JW" },
  ];
  const recentPatients = [
    { id: 1, name: "Alice Cooper", condition: "Hypertension", lastVisit: "2 days ago", status: "Stable", avatar: "AC" },
    { id: 2, name: "Bob Martinez", condition: "Diabetes", lastVisit: "1 week ago", status: "Monitoring", avatar: "BM" },
    { id: 3, name: "Carol White", condition: "Asthma", lastVisit: "3 days ago", status: "Improved", avatar: "CW" },
    { id: 4, name: "David Lee", condition: "Heart Disease", lastVisit: "5 days ago", status: "Critical", avatar: "DL" },
  ];

  const StatCard = ({ stat }) => {
    const colorClasses = {
      blue: "bg-blue-500 dark:bg-blue-600",
      green: "bg-green-500 dark:bg-green-600",
      orange: "bg-orange-500 dark:bg-orange-600",
      red: "bg-red-500 dark:bg-red-600"
    };
    const bgColorClasses = {
      blue: "bg-blue-50 dark:bg-blue-900/20",
      green: "bg-green-50 dark:bg-green-900/20",
      orange: "bg-orange-50 dark:bg-orange-900/20",
      red: "bg-red-50 dark:bg-red-900/20"
    };
    return (
      <div className={`p-6 rounded-xl border border-gray-200 dark:border-gray-700 ${bgColorClasses[stat.color]} hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{stat.trend === 'up' ? '↗' : '↘'}</span>
              {stat.change} from last month
            </p>
          </div>
          <div className={`p-4 rounded-full ${colorClasses[stat.color]}`}>
            <stat.icon />
          </div>
        </div>
      </div>
    );
  };

  const AppointmentCard = ({ appointment }) => {
    const statusColors = {
      Confirmed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      Urgent: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    };
    return (
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {appointment.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{appointment.patient}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900 dark:text-white flex items-center">
            <ClockIcon />
            <span className="ml-1">{appointment.time}</span>
          </p>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${statusColors[appointment.status]}`}>
            {appointment.status}
          </span>
        </div>
      </div>
    );
  };

  const PatientCard = ({ patient }) => {
    const statusColors = {
      Stable: "text-green-600 dark:text-green-400",
      Monitoring: "text-yellow-600 dark:text-yellow-400",
      Improved: "text-blue-600 dark:text-blue-400",
      Critical: "text-red-600 dark:text-red-400"
    };
    return (
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {patient.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{patient.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{patient.condition}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">{patient.lastVisit}</p>
          <p className={`font-medium ${statusColors[patient.status]}`}>{patient.status}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col transition-colors duration-300">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          collapsed={!isSidebarOpen}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          className="fixed left-0 z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700
                    w-16 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out
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
          className={`flex-1 bg-gray-50 dark:bg-black transition-all duration-300 ease-in-out overflow-hidden
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
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pt-6">
              <div>
                <h1 className="text-3xl font-bold text-primary-500">
                  Welcome back, Dr. 
                </h1>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <CalendarIcon />
                  <span className="ml-2">Schedule Appointment</span>
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <PhoneIcon />
                  <span className="ml-2 text-gray-600 dark:text-gray-400">Emergency Contact</span>
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Appointments</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <span className="font-medium text-blue-700 dark:text-blue-400">Add New Patient</span>
                      <span className="text-blue-700 dark:text-blue-400">+</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <span className="font-medium text-green-700 dark:text-green-400">Write Prescription</span>
                      <span className="text-green-700 dark:text-green-400">✓</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                      <span className="font-medium text-orange-700 dark:text-orange-400">Lab Results</span>
                      <span className="text-orange-700 dark:text-orange-400">📋</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <span className="font-medium text-purple-700 dark:text-purple-400">Medical Records</span>
                      <span className="text-purple-700 dark:text-purple-400">📁</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Patients & Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Patients */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Patients</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentPatients.map((patient) => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </div>
              </div>
              {/* Health Metrics Overview */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Health Metrics Overview</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Patient Satisfaction</span>
                        <span className="text-sm font-bold text-green-600">96%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Treatment Success Rate</span>
                        <span className="text-sm font-bold text-blue-600">89%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Appointment Adherence</span>
                        <span className="text-sm font-bold text-purple-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow-up Completion</span>
                        <span className="text-sm font-bold text-orange-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Emergency Alerts */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Emergency Alerts & Notifications</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-800 dark:text-red-400">Critical: Patient John Doe requires immediate attention</p>
                    <p className="text-sm text-red-600 dark:text-red-500">Room 205 - Cardiac irregularities detected</p>
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-500">5 min ago</div>
                </div>
                <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-400">Lab results ready for 3 patients</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">Blood work and X-ray reports available</p>
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-500">15 min ago</div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800 dark:text-blue-400">Appointment rescheduled</p>
                    <p className="text-sm text-blue-600 dark:text-blue-500">Maria Garcia moved appointment to 4:00 PM</p>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">30 min ago</div>
                </div>
              </div>
            </div>
          </div>
          <SocialFooter />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
