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
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center min-w-[150px]">
      <div className={`mb-3 rounded-full w-12 h-12 flex items-center justify-center text-white ${color}`}>
        {icon}
      </div>
      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{count}</p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}