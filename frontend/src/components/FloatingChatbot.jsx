import React, { useState, useRef, useEffect } from 'react';
import { IconRobot, IconX, IconSend } from '@tabler/icons-react';

// Add this CSS string inside a <style> tag or include in your global CSS file
const globalStyles = `
textarea::-webkit-scrollbar {
  display: none;
}
textarea {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
.blink {
  animation: blink 1s infinite;
}
`;

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Hi 👋 How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  useEffect(() => {
    // Inject global styles for scrollbar removal and blinking animation if not already injected
    if (!document.getElementById('floating-chatbot-styles')) {
      const style = document.createElement('style');
      style.id = 'floating-chatbot-styles';
      style.innerHTML = globalStyles;
      document.head.appendChild(style);
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((msgs) => [...msgs, newMsg]);
    setInput('');

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        from: 'bot',
        text: "Thanks for your message! We'll get back to you soon.",
      };
      setMessages((msgs) => [...msgs, botReply]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        className="fixed z-50 bottom-6 right-6 bg-primary-500 hover:bg-primary-600 rounded-full shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 flex items-center justify-center"
        onClick={toggleOpen}
        aria-label={open ? 'Close chat' : 'Open chat'}
        title={open ? 'Close chat' : 'Open chat'}
        style={{ width: 56, height: 56 }}
      >
        {open ? (
          <IconX size={46} className="text-white" />
        ) : (
          <IconRobot size={46} className="text-white" />
        )}
      </button>

      {open && (
        <div
          className="fixed z-50 bottom-20 right-6 rounded-3xl shadow-2xl bg-white dark:bg-neutral-900 flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          style={{
            width: '90vw',
            maxWidth: 400,
            height: 500,
          }}
        >
          <header className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700 bg-primary-50 dark:bg-neutral-800 rounded-t-3xl">
            <h2 id="chat-title" className="font-semibold text-lg text-neutral-900 dark:text-white">
              Chatbot Support
            </h2>
            <button
              className="rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              onClick={toggleOpen}
              aria-label="Close chat"
              title="Close chat"
            >
              <IconX size={24} />
            </button>
          </header>
          <main className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4 bg-neutral-50 dark:bg-neutral-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-5 py-3 rounded-xl whitespace-pre-wrap break-words ${
                  msg.from === 'bot'
                    ? 'self-start bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100'
                    : 'self-end bg-primary-500 text-white'
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </main>
          <form
            className="flex p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 items-center gap-3 rounded-b-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              className="flex-1 px-4 py-2 rounded-lg border border-primary-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 h-10 overflow-hidden resize-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              aria-label="Chat message input"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-200 disabled:opacity-50 slow-blink-slide"
              aria-label="Send message"
              title="Send message"
            >
              <IconSend size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
