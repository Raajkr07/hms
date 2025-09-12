import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header";
import AdminSidebar from "../AdminSidebar";
import Footer from "../../../components/footer/SocialFooter";
import { Switch } from "@mantine/core";
import { useTheme } from "../../../hooks/UseTheme";
import { useMediaQuery } from "@mui/material";

const AdminSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;
  const navigate = useNavigate();

  const { isDark, toggleColorScheme } = useTheme();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [formData, setFormData] = useState({
    language: "en",
    notifications: true,
    twoFA: false,
    publicProfile: false,
    shareActivity: false,
    userRole: "editor",
    accessLevel: "full",
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
    alert("Admin settings saved successfully!");
    // Integrate API call here to persist changes
  };

  return (
    <div className="min-h-screen flex flex-col bg-bodybg text-bodytext transition-colors duration-300">
      <Header />

      <div className="flex flex-1 pt-[70px]">
        {/* Sidebar */}
        <aside
          onMouseEnter={() => !isMobile && setSidebarHovered(true)}
          onMouseLeave={() => !isMobile && setSidebarHovered(false)}
          style={{ width: isSidebarOpen ? 256 : 64, transition: "width 0.3s ease" }}
          className="border-r border-gray-200 bg-sidebarbg text-sidebartext fixed h-full z-10"
        >
          <AdminSidebar collapsed={!isSidebarOpen} />
        </aside>

        {/* Main Content */}
        <main
          className={`flex-grow p-6 transition-all duration-300 max-w-6xl mx-auto ml-[64px] sm:ml-[256px]`}
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-10 bg-white dark:bg-gray-700/25 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            {/* Account Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-2">
                Account Setting
              </h2>
              <div className="flex flex-col space-y-5 max-w-md">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-max"
                >
                  Change Password
                </button>

                <div className="flex items-center justify-between">
                  <label htmlFor="twoFA" className="font-medium select-none">
                    Two-Factor Authentication
                  </label>
                  <input
                    id="twoFA"
                    type="checkbox"
                    name="twoFA"
                    checked={formData.twoFA}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer"
                    aria-label="Enable Two-Factor Authentication"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-2">
                Preferences
              </h2>
              <div className="flex flex-col space-y-6 max-w-md">
                <div className="flex items-center justify-between">
                  <label htmlFor="darkMode" className="font-medium select-none">
                    Dark Mode
                  </label>
                  <Switch
                    id="darkMode"
                    checked={isDark}
                    onChange={toggleColorScheme}
                    aria-label="Toggle Dark Mode"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="notifications" className="font-medium select-none">
                    Email Notifications
                  </label>
                  <input
                    id="notifications"
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="language" className="block font-medium mb-1">
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    aria-label="Select preferred language"
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
            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-2">
                Privacy
              </h2>
              <div className="flex flex-col space-y-5 max-w-md">
                <div className="flex items-center justify-between">
                  <label htmlFor="publicProfile" className="font-medium select-none">
                    Show my profile publicly
                  </label>
                  <input
                    id="publicProfile"
                    type="checkbox"
                    name="publicProfile"
                    checked={formData.publicProfile}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="shareActivity" className="font-medium select-none">
                    Share activity with team
                  </label>
                  <input
                    id="shareActivity"
                    type="checkbox"
                    name="shareActivity"
                    checked={formData.shareActivity}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer"
                  />
                </div>
              </div>
            </section>

            {/* User Management */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-2">
                User Management
              </h2>
              <div className="flex flex-col space-y-6 max-w-md">
                <div>
                  <label htmlFor="userRole" className="block font-medium mb-1">
                    Default Role for New Users
                  </label>
                  <select
                    id="userRole"
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleChange}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    aria-label="Select default role for new users"
                  >
                    <option value="admin">Administrator</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="accessLevel" className="block font-medium mb-1">
                    Access Level
                  </label>
                  <select
                    id="accessLevel"
                    name="accessLevel"
                    value={formData.accessLevel}
                    onChange={handleChange}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
                    aria-label="Select access level"
                  >
                    <option value="full">Full Access</option>
                    <option value="limited">Limited Access</option>
                    <option value="readOnly">Read Only</option>
                  </select>
                </div>
              </div>
            </section>

            {/* System Settings */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 dark:border-gray-600 pb-2">
                System Settings
              </h2>
              <div className="max-w-md space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  system-wide settings like maintenance mode, API keys, logs, etc. I will implement this later
                </p>
                {/* i will add logic here later */}
              </div>
            </section>

            {/* Account Delete */}
            <section className="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg p-6 max-w-md">
              <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-300">
                Leave Community
              </h2>
              <button
                type="button"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete your admin account? This action cannot be undone."
                    )
                  ) {
                    // i will write delete logic here
                  }
                }}
              >
                Delete Account
              </button>
            </section>

            {/* Save Button */}
            <div className="flex justify-end max-w-md">
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                aria-label="Save Changes"
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

export default AdminSettingsPage;
