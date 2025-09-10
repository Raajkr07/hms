import React, { useState, useEffect } from "react";
import { Star, Video, MessageCircle, X } from "lucide-react";
import Header from "../../../components/header/Header";
import Sidebar from "../DoctorSidebar";
import Footer from "../../../components/footer/SocialFooter";
import appointmentsData from "../data/AppointmentData";

// Helper: Check if appointment is in the future or today vs past by comparing dates
const isUpcoming = (dateStr) => {
  const today = new Date();
  const aptDate = new Date(dateStr);
  // Compare only date parts (ignore time)
  today.setHours(0, 0, 0, 0);
  aptDate.setHours(0, 0, 0, 0);
  return aptDate >= today;
};

const DoctorAppointmentPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;

  // Toggle state to switch between upcoming vs previous appointments
  const [viewToggle, setViewToggle] = useState("upcoming"); // 'upcoming' or 'previous'

  const [appointments, setAppointments] = useState(appointmentsData);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (selectedAppointment) {
      setChatHistory(selectedAppointment.chatMessages || []);
    }
  }, [selectedAppointment]);

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: newStatus,
            }
          : apt
      )
    );
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !selectedAppointment) return;
    const newMsg = {
      sender: "doctor",
      message: chatInput.trim(),
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory((prev) => [...prev, newMsg]);
    setChatInput("");
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === selectedAppointment.id
          ? { ...apt, chatMessages: [...(apt.chatMessages || []), newMsg] }
          : apt
      )
    );
  };

  const joinVideoCall = (link) => {
    window.open(link, "_blank", "width=900,height=700");
  };

  // Filter displayed appointments by toggle
  const filteredAppointments =
    viewToggle === "upcoming"
      ? appointments.filter((apt) => isUpcoming(apt.date) && apt.status !== "rejected")
      : appointments.filter((apt) => !isUpcoming(apt.date) || apt.status === "rejected");

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-bodybg text-bodytext">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-1 pt-[70px]">
        <div
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{ width: sidebarCollapsed ? 64 : 256, transition: "width 0.3s ease" }}
          className="border-r border-gray-200 bg-sidebarbg text-sidebartext"
        >
          <Sidebar collapsed={!isSidebarOpen} />
        </div>

        <main className="flex-grow p-6 flex flex-col">

          {/* Toggle Buttons */}
          <div className="mb-6 flex gap-4 justify-center md:justify-center">
            <button
              onClick={() => setViewToggle("upcoming")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewToggle === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
              aria-pressed={viewToggle === "upcoming"}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setViewToggle("previous")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                viewToggle === "previous"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
              aria-pressed={viewToggle === "previous"}
            >
              Previous Appointments
            </button>
          </div>

          {filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500">
              {viewToggle === "upcoming"
                ? "No upcoming appointments."
                : "No previous appointments."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-appointmentbg border border-appointmentborder dark:bg-slate-900 rounded-xl shadow-md p-5 flex flex-col justify-between"
                  tabIndex={0}
                  aria-label={`Appointment with ${apt.patientName} on ${apt.date} at ${apt.time}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold">{apt.patientName}</h2>
                      <span
                        className={`px-2 py-0.5 rounded text-sm font-semibold ${
                          apt.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : apt.status === "confirmed"
                            ? "bg-green-200 text-green-800"
                            : apt.status === "rejected"
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-300 text-gray-700"
                        }`}
                        aria-live="polite"
                      >
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      <strong>Date:</strong> {apt.date}
                    </p>
                    <p className="text-sm text-gray-400 mb-1">
                      <strong>Time:</strong> {apt.time}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      <strong>Reason:</strong> {apt.reason || "-"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 gap-2 flex-wrap">
                    {viewToggle === "upcoming" && apt.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(apt.id, "confirmed")}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          aria-label={`Confirm appointment with ${apt.patientName}`}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "rejected")}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          aria-label={`Reject appointment with ${apt.patientName}`}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {viewToggle === "upcoming" && apt.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(apt.id, "completed")}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        aria-label={`Mark appointment with ${apt.patientName} as completed`}
                      >
                        Mark as Completed
                      </button>
                    )}

                    {(viewToggle === "upcoming" || viewToggle === "previous") &&
                      (apt.status === "confirmed" || apt.status === "completed") && (
                        <button
                          onClick={() => joinVideoCall(apt.videoCallLink)}
                          className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                          aria-label={`Join video call with ${apt.patientName}`}
                        >
                          <Video className="w-4 h-4" /> Video Call
                        </button>
                      )}

                    <button
                      onClick={() => setSelectedAppointment(apt)}
                      className="flex items-center gap-2 px-3 py-1 border border-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      aria-label={`Open chat with ${apt.patientName}`}
                    >
                      <MessageCircle className="w-4 h-4" /> Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Chat Panel */}
        {selectedAppointment && (
          <aside
            aria-label={`Chat with ${selectedAppointment.patientName}`}
            className="fixed right-0 top-[70px] h-[calc(100vh-70px)] w-full max-w-md bg-chatbg border-l border-chatborder flex flex-col dark:bg-gray-900 dark:border-gray-700"
          >
            <header className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                Chat: {selectedAppointment.patientName}
              </h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                aria-label="Close chat"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </header>
            <div
              className="flex-1 overflow-auto p-4 space-y-3 bg-chatwindowbg dark:bg-gray-800"
              role="log"
              aria-live="polite"
              tabIndex={0}
            >
              {chatHistory.length === 0 && (
                <p className="text-gray-500 italic text-center">No messages yet.</p>
              )}
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] px-3 py-2 rounded-lg shadow ${
                    msg.sender === "doctor"
                      ? "self-end bg-blue-600 text-white"
                      : "self-start bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <span className="text-xs text-gray-200 dark:text-gray-400 block mt-1 text-right">
                    {msg.ts}
                  </span>
                </div>
              ))}
            </div>
            <form
              className="p-4 border-t border-gray-300 dark:border-gray-700 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                aria-label="Type your message"
                placeholder="Type your message…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow rounded-md border border-inputborder bg-inputbg px-3 py-2 text-inputtext focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </aside>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DoctorAppointmentPage;
