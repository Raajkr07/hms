import React, { useState, useEffect, useRef } from "react";
import { Video, Mic, MicOff, MessageCircle, X, PhoneOff } from "lucide-react";
import Header from "../../../components/header/Header";
import Sidebar from "../DoctorSidebar";
import Footer from "../../../components/footer/SocialFooter";
import adminData from "../data/MeetingData";

const MeetingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const isSidebarOpen = !sidebarCollapsed || sidebarHovered;

  // Meeting state
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Participants: Using adminData as example participants (doctors/admins)
  const [participants] = useState(adminData);

  // Dummy local video ref (simulate video stream)
  const localVideoRef = useRef(null);

  // Function to toggle video
  const toggleVideo = () => setVideoEnabled((prev) => !prev);

  // Function to toggle audio
  const toggleAudio = () => setAudioEnabled((prev) => !prev);

  // Send chat message
  const sendChatMessage = () => {
    if (chatInput.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      sender: "You",
      message: chatInput.trim(),
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  // Placeholder for video stream setup (this would be replaced by real WebRTC or video SDK logic)
  useEffect(() => {
    if (localVideoRef.current) {
      // Here you would getUserMedia and set local video srcObject
      // For placeholder demo, we'll just set muted video and black background
      localVideoRef.current.srcObject = null;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bodybg text-bodytext transition-colors duration-300">
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

        <main className="flex-grow p-6 flex flex-col items-center justify-center relative">

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl">
            <section className="flex-grow flex flex-col items-center bg-cardbg border border-cardborder rounded-lg p-6 shadow-lg">
              <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden dark:bg-slate-900 bg-black">
                {videoEnabled ? (
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white text-lg">
                    Video Disabled
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={toggleVideo}
                  aria-pressed={videoEnabled}
                  className={`px-4 py-2 rounded-lg transition ${
                    videoEnabled ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {videoEnabled ? <Video className="inline-block w-5 h-5 mr-2" /> : <Video className="inline-block w-5 h-5 mr-2 line-through" />}
                  {videoEnabled ? "Turn Off Video" : "Turn On Video"}
                </button>

                <button
                  onClick={toggleAudio}
                  aria-pressed={audioEnabled}
                  className={`px-4 py-2 rounded-lg transition ${
                    audioEnabled ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {audioEnabled ? <Mic className="inline-block w-5 h-5 mr-2" /> : <MicOff className="inline-block w-5 h-5 mr-2" />}
                  {audioEnabled ? "Mute" : "Unmute"}
                </button>

                <button
                  onClick={() => setChatOpen((prev) => !prev)}
                  aria-expanded={chatOpen}
                  aria-controls="chat-panel"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white transition hover:bg-purple-700 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {chatOpen ? "Close Chat" : "Open Chat"}
                </button>
              </div>

              <div className="mt-6 w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-2">Participants</h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {participants.map((p) => (
                    <li
                      key={p.id}
                      className="bg-participantbg border border-participantborder rounded-md p-3 flex flex-col"
                      aria-label={`${p.name}, ${p.role}, specialty ${p.specialty}`}
                    >
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-sm text-gray-400">{p.role}</span>
                      <span className="text-sm text-gray-500 italic">{p.specialty}</span>
                      <span className="text-sm">{p.email}</span>
                      <span className="text-sm">{p.phone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Right: Chat Panel */}
            {chatOpen && (
              <aside
                id="chat-panel"
                className="w-full md:w-96 bg-chatbg border border-chatborder rounded-lg shadow-lg flex flex-col"
                aria-label="Chat Panel"
              >
                <header className="flex justify-between items-center px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Chat</h3>
                  <button
                    onClick={() => setChatOpen(false)}
                    aria-label="Close chat"
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </header>

                <div
                  className="flex-1 p-4 space-y-3 overflow-auto"
                  role="log"
                  aria-live="polite"
                  tabIndex={0}
                >
                  {chatMessages.length === 0 ? (
                    <p className="text-center text-gray-500 italic">No messages yet.</p>
                  ) : (
                    chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="max-w-[80%] px-3 py-2 rounded-lg shadow bg-blue-600 text-white self-end"
                      >
                        <p className="text-sm">{msg.message}</p>
                        <span className="text-xs text-gray-200 block mt-1 text-right">
                          {msg.ts}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <form
                  className="p-4 border-t border-gray-300 dark:border-gray-700 flex gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatMessage();
                  }}
                >
                  <input
                    type="text"
                    aria-label="Type your message"
                    placeholder="Type your message..."
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
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MeetingPage;
