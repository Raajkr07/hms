import React, { useState, useEffect, useRef } from "react";
import { useMantineTheme } from "@mantine/core";
import { User } from "lucide-react";

import Header from "../../../components/header/Header";
import Sidebar from "../UserSidebar";
import Footer from "../../../components/footer/SocialFooter";

const ProfilePage = () => {
  const theme = useMantineTheme();

  // Sidebar state & hover logic aligned with dashboard
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [scrollingArea, setScrollingArea] = useState(null);

  const isSidebarOpen = !sidebarCollapsed || sidebarHovered || logoHovered;

  // Scroll sync logic copied from dashboard
  const handleMainScroll = (e) => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    setScrollingArea("main");
    scrollTimeoutRef.current = setTimeout(() => setScrollingArea(null), 300);
  };

  const handleSidebarScroll = (e) => {
    e.stopPropagation();
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    setScrollingArea("sidebar");
    scrollTimeoutRef.current = setTimeout(() => setScrollingArea(null), 300);
  };

  // Profile form state & handlers
  const [profileData, setProfileData] = useState({
    Name: "Raj Kumar",
    email: "rajkumar07.dev@gmail.com",
    contact: 7903287079,
    jobTitle: "Software Developer",
    showOnProfile: true,
    state: "Bihar",
    country: "India",
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validation & API call
    console.log("Profile updated:", profileData);
    alert("Profile updated successfully!");
  };

  // Compute sidebar width for main content margin
  const getSidebarWidth = () => (sidebarCollapsed ? 64 : 256);

  return (
    <div className="min-h-screen mt-16 flex flex-col bg-white dark:bg-custom-dark transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <Header
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          collapsed={!isSidebarOpen}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onScroll={handleSidebarScroll}
          freezeScroll={scrollingArea === "main"}
          className="fixed left-0 top-[60px] z-30 shadow-xl border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-custom-dark transition-all duration-300 ease-in-out w-16 sm:w-64 h-[calc(100vh-60px)]"
        />
        <main
          onScroll={handleMainScroll}
          className="flex-1 px-6 sm:px-10 py-8 transition-all duration-300 ease-in-out"
          style={{ marginLeft: getSidebarWidth() }}
          aria-label="Profile Page Main Content"
        >
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-12 bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md"
          >
            {/* Profile Photo & Actions */}
            <section className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors">
                  <User size={44} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            </section>

            {/* Form Fields */}
            <section className="space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="Name" className="block mb-2 text-sm font-semibold">
                  Name
                </label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  value={profileData.Name}
                  onChange={(e) => handleInputChange("Name", e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition"
                  aria-required="true"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="example@mail.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition"
                  aria-required="true"
                />
              </div>

              {/* Contact */}
              <div>
                <label htmlFor="contact" className="block mb-2 text-sm font-semibold">
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={profileData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  required
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10,15}"
                  title="Phone number should be 10 to 15 digits"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition"
                  aria-required="true"
                />
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block mb-2 text-sm font-semibold">
                  Job Profile
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={profileData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  placeholder="Your current job title"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 transition"
                />
              </div>

              {/* Show on Profile */}
              <div className="flex items-center space-x-3">
                <input
                  id="showOnProfile"
                  name="showOnProfile"
                  type="checkbox"
                  checked={profileData.showOnProfile}
                  onChange={(e) => handleInputChange("showOnProfile", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="showOnProfile"
                  className="text-sm text-gray-700 dark:text-gray-300 select-none"
                >
                  Show on my profile
                </label>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block mb-2 text-sm font-semibold">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={profileData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 transition"
                >
                  <option>Bihar</option>
                  <option>Uttar Pradesh</option>
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Hyderabad</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block mb-2 text-sm font-semibold">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={profileData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-600 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 transition"
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Japan</option>
                  <option>Australia</option>
                </select>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="rounded bg-primary-600 px-6 py-3 text-white font-semibold shadow hover:bg-primary-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
