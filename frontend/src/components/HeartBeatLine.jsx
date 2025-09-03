import React, { useState } from 'react';

export function HeartbeatLine() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minHeight: '65px' }}
    >
      <svg
        className="block w-full h-16"
        viewBox="0 0 1920 100"
        style={{ display: hovered ? 'block' : 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="
            M0,50 
            L160,50 
            L240,20 
            L320,80 
            L400,35
            L480,50
            L760,50
            L840,20
            L920,80
            L1000,50
            L1400,50
            L1480,20
            L1560,80
            L1640,50
            L1920,50
          "
        >
          <animate
            attributeName="stroke-dashoffset"
            from="2000"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            from="2000"
            to="2000"
            dur="0.2s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  );
}
