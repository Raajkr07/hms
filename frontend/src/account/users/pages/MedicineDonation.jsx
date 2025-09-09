import React, { useState, useRef, useEffect } from 'react';
import Header from '../../../components/header/Header';
import Sidebar from '../UserSidebar';
import Footer from '../../../components/footer/SocialFooter';
import { Heart, Users as UsersIcon, } from 'lucide-react';
import { wastegeStats } from '../../../data/DonationPageData';
import { medicineDonationPlans } from '../../../data/MedicineDonationData';

const MedicineDonationPage = ({ initialMode = 'donate' }) => {
  const [selectedMode, setSelectedMode] = useState(initialMode);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scrollingArea, setScrollingArea] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customQuantity, setCustomQuantity] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    medicineName: '',
    medicineQuantity: '',
    expiryDate: '',
    prescriptionUpload: null,
    isAdult: false,
    newsletter: true,
  });
  const [currentStat, setCurrentStat] = useState(0);

  // Detect mobile and manage body scroll when sidebar open on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Cycling stats for UI effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % wastegeStats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handlers for sidebar and main area
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

  // Sidebar toggle
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  // Sidebar visibility including hover and logo state
  const isSidebarOpen = !sidebarCollapsed || logoHovered || sidebarHovered;

  // Form input change handler handles file inputs too
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // Handle plan selection for donation
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCustomQuantity('');
  };

  // Custom quantity input for donation plans
  const handleCustomQuantity = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setSelectedPlan(null);
    setCustomQuantity(value);
  };

  // Get currently selected quantity for donation plans
  const getSelectedQuantity = () => (selectedPlan ? selectedPlan.quantity : parseInt(customQuantity) || 0);

  // Form submit validation and alert
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.mobile || !form.isAdult) {
      alert('Please fill all required fields');
      return;
    }

    if (selectedMode === 'donate') {
      if (getSelectedQuantity() < 1) {
        alert('Please select or enter valid medicine quantity to donate.');
        return;
      }
      if (!form.medicineName) {
        alert('Please enter medicine name.');
        return;
      }
      if (!form.expiryDate) {
        alert('Please enter medicine expiry date.');
        return;
      }
    } else if (selectedMode === 'request') {
      if (!form.medicineName) {
        alert('Please enter needed medicine name.');
        return;
      }
      if (!form.prescriptionUpload) {
        alert('Please upload prescription.');
        return;
      }
    }

    alert(`Thank you, your ${selectedMode} request has been submitted!`);
  };

  return (
    <div className="min-h-screen mt-10 bg-white dark:bg-black transition-colors duration-300 flex flex-col">
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
          {/* Mode toggle buttons */}
          <div className="max-w-4xl mx-auto flex justify-center gap-6 pt-4 pb-10">
            <button
              onClick={() => setSelectedMode('donate')}
              className={`rounded-2xl px-6 py-3 font-semibold text-lg transition ${
                selectedMode === 'donate'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Donate Medicine
            </button>
            <button
              onClick={() => setSelectedMode('request')}
              className={`rounded-2xl px-6 py-3 font-semibold text-lg transition ${
                selectedMode === 'request'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Request Medicine
            </button>
          </div>

          {/* Donate Mode Form */}
          {selectedMode === 'donate' ? (
            <>
              <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">
                      Choose Your Donation Impact Level
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                      Each donation amplifies lifesaving medicine redistribution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {medicineDonationPlans.map((plan, index) => (
                      <div
                        key={index}
                        onClick={() => handlePlanSelect(plan)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedPlan?.name === plan.name ? 'ring-4 ring-blue-500' : ''
                        } ${plan.popular ? 'lg:-mt-4' : ''}`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                          </div>
                        )}

                        <div className={`bg-gradient-to-br ${plan.color} p-6 rounded-2xl text-white h-full`}>
                          <div className="flex items-center justify-between mb-4">
                            <plan.icon className="w-8 h-8" />
                            <div className="text-right">
                              <div className="text-2xl font-bold">{plan.quantity} units</div>
                              <div className="text-sm opacity-80">estimated coverage</div>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                          <p className="text-sm mb-4 opacity-90">{plan.impact}</p>

                          
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Or enter medicine quantity:</p>
                    <input
                      type="text"
                      value={customQuantity}
                      onChange={handleCustomQuantity}
                      placeholder="Minimum 1 unit"
                      className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-center text-xl font-semibold w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-slate-700 rounded-3xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
                      Medicine Donation Details
                    </h2>

                    <div className="space-y-6">
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={form.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile Number *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        name="medicineName"
                        required
                        value={form.medicineName}
                        onChange={handleInputChange}
                        placeholder="Medicine Name *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={form.expiryDate}
                        onChange={handleInputChange}
                        placeholder="Expiry Date (YYYY-MM-DD) *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />

                      <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAdult"
                          checked={form.isAdult}
                          onChange={handleInputChange}
                          required
                          className="mt-1 accent-blue-500"
                        />
                        <span className="text-sm">
                          I declare that I am above 18 years of age and a resident of India. I ensure this medicine donation is safe and compliant.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={form.newsletter}
                          onChange={handleInputChange}
                          className="mt-1 accent-blue-500"
                        />
                        <span className="text-sm">Send me updates about impact and success stories from the community.</span>
                      </label>

                      <button
                        onClick={handleSubmit}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Heart className="w-6 h-6" />
                        Donate Medicines Now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className=" bg-white dark:bg-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-br from-white to-green-50 dark:from-black dark:to-slate-700 rounded-3xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
                      Request Medicine
                    </h2>

                    <div className="space-y-6">
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={form.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile Number *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                      <input
                        type="text"
                        name="medicineName"
                        required
                        value={form.medicineName}
                        onChange={handleInputChange}
                        placeholder="Required Medicine Name *"
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                      <input
                        type="file"
                        name="prescriptionUpload"
                        accept="image/*,.pdf"
                        required
                        onChange={handleInputChange}
                        className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                      />

                      <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAdult"
                          checked={form.isAdult}
                          onChange={handleInputChange}
                          required
                          className="mt-1 accent-green-500"
                        />
                        <span className="text-sm">I confirm I am above 18 years old and the prescription is authentic.</span>
                      </label>

                      <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={form.newsletter}
                          onChange={handleInputChange}
                          className="mt-1 accent-green-500"
                        />
                        <span className="text-sm">Receive updates on medicine availability and community impact.</span>
                      </label>

                      <button
                        onClick={handleSubmit}
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <UsersIcon className="w-6 h-6" />
                        Request Medicines Now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MedicineDonationPage;
