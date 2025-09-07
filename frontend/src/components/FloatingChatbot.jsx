import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Moon,
  Sun,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  User,
  Bot,
} from 'lucide-react';

const IndustryChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        "Hello! I'm HopeMeds Assistant. I can help you with medicine donations, waste management, and healthcare information. How can I assist you today?",
      timestamp: new Date(),
      status: 'delivered',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay - replace with your AI integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      content:
        "Thank you for your message! I can assist with donation info, wastage reduction, and more. How can I help?",
      timestamp: new Date(),
      status: 'delivered',
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  }, [input, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const copyMessage = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared. How can I help you today?",
        timestamp: new Date(),
        status: 'delivered',
      },
    ]);
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const formatTime = (timestamp) => timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 shadow-xl flex items-center justify-center text-white transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        title={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-20 right-6 z-50 flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-10 w-96' : 'h-[500px] max-w-[400px] w-[90vw]'
            }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-t-2xl shadow-md"
            style={{ height: 40 }}
          >
            <div className="flex items-center space-x-2 h-full">
              <div className="rounded-full w-7 h-7 bg-white/20 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <h3 id="chat-title" className="font-semibold text-sm sm:text-sm ">
                  HopeMeds Assistant
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-1 h-full">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                title={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                style={{ height: 28, width: 28 }}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                title={soundEnabled ? 'Mute notifications' : 'Enable notifications'}
                aria-label={soundEnabled ? 'Mute notifications' : 'Enable notifications'}
                style={{ height: 28, width: 28 }}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                title="Settings"
                aria-label="Settings"
                style={{ height: 28, width: 28 }}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>


          {/* Settings Panel */}
          {showSettings && !isMinimized && (
            <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center justify-between">
                <span>Chat Settings</span>
                <button
                  onClick={clearChat}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                  aria-label="Clear chat"
                >
                  <Trash2 size={16} />
                  <span>Clear Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* Messages Panel */}
          {!isMinimized && (
            <div
              ref={messagesRef}
              className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-800"
              style={{ height: showSettings ? '320px' : '380px' }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`flex items-end space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                        }`}
                    >
                      {message.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={`px-4 py-2 rounded-2xl relative group ${message.type === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-bl-sm'
                          }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <button
                          onClick={() => copyMessage(message.content, message.id)}
                          className="absolute -top-2 -right-2 p-1 bg-gray-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy message"
                          aria-label="Copy message"
                        >
                          {copiedMessageId === message.id ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                      <span
                        className={`text-xs mt-1 text-gray-500 ${message.type === 'user' ? 'text-right' : 'text-left'
                          }`}
                      >
                        {formatTime(message.timestamp)}
                        {message.type === 'user' && (
                          <span className="ml-1">{message.status === 'sent' ? '✓' : '✓✓'}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex items-end space-x-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-500 text-white">
                      <Bot size={12} />
                    </div>
                    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-2xl rounded-bl-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[100ms]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[200ms]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-[300ms]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isConnected && (
                <div className="flex items-center justify-center p-2">
                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>Connection lost. Trying to reconnect...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}

          {/* Input Section */}
          {!isMinimized && (
            <div className="border-t border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900" style={{ height: 60 }}>
              <div className="flex items-center space-x-2 h-full">
                <div className="flex-1 relative h-full">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full h-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm max-h-20 overflow-y-auto"
                    rows={1}
                    disabled={!isConnected}
                    aria-label="Chat message input"
                    style={{ lineHeight: '1.2', minHeight: '40px', maxHeight: '56px' }}
                  />
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping || !isConnected}
                  className="h-10 w-10 flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105"
                  aria-label="Send message"
                  title="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          } 
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default IndustryChatbot;