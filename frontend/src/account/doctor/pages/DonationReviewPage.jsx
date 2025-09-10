import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../components/header/Header';
import Sidebar from '../DoctorSidebar';
import Footer from '../../../components/footer/SocialFooter';
import { CheckCircle, XCircle } from 'lucide-react';
import { donationsData, requestsData } from '../data/MedicineDonationData';

// const fetchDonations = async () => {
  
// };

// useEffect(() => {
//     const loadDonations = async () => {
//       const data = await fetchDonations();
//       setDonations(data);
//     };
//     loadDonations();
//   }, []);

const DoctorDonationReviewPage = () => {
  const [donations, setDonations] = React.useState([]);
  const [filterUserType, setFilterUserType] = React.useState('donate');

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scrollingArea, setScrollingArea] = useState(null);
  const scrollTimeoutRef = useRef(null);

  React.useEffect(() => {
    setDonations([...donationsData, ...requestsData]); 
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
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const isSidebarOpen = !sidebarCollapsed || logoHovered || sidebarHovered;

  // Handle status update for donation/request approval
  const updateStatus = (id, newStatus) => {
    setDonations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Filter donations by selected type
  const filteredDonations = donations.filter((item) => item.userType === filterUserType);

  return (
    <div className="min-h-screen mt-10 bg-white dark:bg-black transition-colors duration-300 flex flex-col">
      <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={!isSidebarOpen} />
      {/* Toggle buttons below header */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          className={`px-6 py-3 rounded-2xl font-semibold text-lg transition ${
            filterUserType === 'donate'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setFilterUserType('donate')}
        >
          Donations
        </button>
        <button
          className={`px-6 py-3 rounded-2xl font-semibold text-lg transition ${
            filterUserType === 'request'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setFilterUserType('request')}
        >
          Requests
        </button>
      </div>
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

          {filteredDonations.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300">
              No {filterUserType === 'donate' ? 'donation' : 'request'} submissions found.
            </p>
          ) : (
            filteredDonations.map((item) => (
              <div
                key={item.id}
                className="mb-8 p-6 border rounded-xl shadow-md dark:border-gray-700 dark:bg-slate-900 bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">
                    {filterUserType === 'donate' ? 'Donation' : 'Request'} #{item.id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === 'approved'
                        ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
                        : item.status === 'rejected'
                        ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-800 dark:text-gray-200">
                  <div>
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {item.mobile}
                    </p>
                    <p>
                      <strong>Medicine Name:</strong> {item.medicineName}
                    </p>
                    {filterUserType === 'donate' && (
                      <>
                        <p>
                          <strong>Quantity:</strong> {item.medicineQuantity} units
                        </p>
                        <p>
                          <strong>Expiry Date:</strong> {item.expiryDate}
                        </p>
                      </>
                    )}
                    {filterUserType === 'request' && (
                      <p>
                        <strong>Prescription:</strong>{' '}
                        {item.prescriptionUpload ? (
                          <a
                            href={item.prescriptionUpload}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600 dark:text-blue-400"
                          >
                            View Prescription
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                    <p>
                      <strong>Newsletter Subscription:</strong> {item.newsletter ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Adult Confirmation:</strong> {item.isAdult ? 'Confirmed' : 'Not confirmed'}
                    </p>
                    <p>
                      <strong>Submitted At:</strong>{' '}
                      {new Date(item.submittedAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    disabled={item.status === 'approved'}
                    onClick={() => updateStatus(item.id, 'approved')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white ${
                      item.status === 'approved'
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" /> Approve
                  </button>
                  <button
                    disabled={item.status === 'rejected'}
                    onClick={() => updateStatus(item.id, 'rejected')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white ${
                      item.status === 'rejected'
                        ? 'bg-red-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                    }`}
                  >
                    <XCircle className="w-5 h-5" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDonationReviewPage;
