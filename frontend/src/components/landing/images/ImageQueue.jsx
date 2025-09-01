import React from 'react';
export default function ImageQueue({ images, height = 180, speed = 10 }) {
  const duration = `${speed}s`;

  return (
    <div className="overflow-hidden whitespace-nowrap relative w-full" style={{ height }}>
      <div className="inline-block animate-slide-right" style={{ animationDuration: duration }}>
        {[...images, ...images].map(({ src, alt, caption }, idx) => (
          <div key={idx} className="inline-block px-4 max-w-xs">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="w-full" style={{ height }}>
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover object-center"
                  style={{ aspectRatio: '4 / 3' }}
                />
              </div>
              <p className="p-2 text-center text-gray-600 dark:text-gray-400 text-sm">{caption}</p>
            </div>
          </div>
        ))}
    </div>

      <style>{`
    @keyframes slide-right {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }
    .animate-slide-right {
      animation: slide-right linear infinite;
      will-change: transform;
    }
  `}</style>
    </div>
  );
}
