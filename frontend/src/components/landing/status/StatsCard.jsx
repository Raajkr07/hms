import React, { useState, useEffect, useRef } from 'react';

export default function StatsCard({ icon, label, value, color, duration = 3000 }) {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef(null);
  const cleanValue = Number(value.toString().replace(/,/g, ''));
  const end = isNaN(cleanValue) ? 0 : cleanValue;

  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }
    function step(timestamp) {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = timestamp - startTimestamp.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    }
    window.requestAnimationFrame(step);
    return () => {
      startTimestamp.current = null;
    };
  }, [end, duration]);

  return (
    <div
      className={`
        flex flex-col items-center bg-white dark:bg-black rounded-lg
        p-6 text-center min-w-[155px] transition-transform duration-300 ease-in-out
        relative stats-card-gradient
      `}
      style={{ cursor: 'pointer' }}
    >
      <div className={`mb-3 rounded-full w-12 h-12 flex items-center justify-center text-white ${color} z-10 relative`}>
        {icon}
      </div>
      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 z-10 relative">{count}</p>
      <p className="mt-1 text-gray-500 dark:text-gray-400 z-10 relative">{label}</p>

      <style>{`
        .stats-card-gradient {
          position: relative;
          box-sizing: border-box;
          border-radius: 0.75rem;
          min-height: 240px;
          border: 4px solid transparent;
          overflow: visible;
          z-index: 0;
          transition: transform 0.3s ease-in-out;
        }
        .stats-card-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 4px; /* border thickness */
          background: linear-gradient(270deg, #44ff9a, #44b0ff, #8b44ff, #ff6644, #ebff70, #44ff9a);
          background-size: 1200% 1200%;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0; /* hidden by default */
          z-index: -1;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
        .stats-card-gradient:hover::before {
          opacity: 1;
          animation: polymorph-border 12s ease infinite;
        }
        .stats-card-gradient:hover {
          transform: scale(1.05);
        }
        @keyframes polymorph-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
