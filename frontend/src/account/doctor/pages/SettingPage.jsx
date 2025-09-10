import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../components/header/Header";
import Sidebar from "../DoctorSidebar";
import Footer from "../../../components/footer/SocialFooter";
import { Switch } from "@mantine/core";
import { useTheme } from "../../../hooks/UseTheme";

const UserSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;
  const navigate = useNavigate();

  const { isDark, toggleColorScheme } = useTheme();

  const [formData, setFormData] = useState({
    language: "en",
    notifications: true,
    twoFA: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-bodybg text-bodytext transition-colors duration-300">
      <Header />
      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <aside
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{ width: sidebarCollapsed ? 64 : 256, transition: "width 0.3s ease" }}
          className="border-r border-gray-200 bg-sidebarbg text-sidebartext"
        >
          <Sidebar collapsed={!isSidebarOpen} />
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 max-w-4xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Security */}
            <section className="p-6 rounded-lg shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Account Security</h2>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Two-Factor Authentication</label>
                  <input
                    type="checkbox"
                    name="twoFA"
                    checked={formData.twoFA}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="p-6 rounded-lg shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Dark Mode</label>
                  <Switch checked={isDark} onChange={toggleColorScheme} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Email Notifications</label>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="bn">বাংলা</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Privacy */}
            <section className="p-6 rounded-lg shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Privacy</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Show my profile publicly</label>
                  <input type="checkbox" className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Share activity with friends</label>
                  <input type="checkbox" className="h-5 w-5" />
                </div>
              </div>
            </section>

            {/* Account Delete */}
            <section className="p-6 rounded-lg shadow bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700">
              <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-300">Leave Community</h2>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </section>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserSettingsPage;