import React from 'react';

export default function AnimatedImageGrid({ images }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {images.map(({ src, alt, caption }, idx) => (
        <div
          key={idx}
          className="group relative rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-900 cursor-pointer transition-all duration-200"
        >
          {/* Gradient animated border on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-10 group-hover:border-4 group-hover:border-gradient group-hover:animate-border-pulse"></div>
          
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-48 object-cover rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-105"
            style={{ aspectRatio: '4/3' }}
          />
          {caption && (
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm p-2 text-center">
              {caption}
            </div>
          )}

          {/* Custom CSS for gradient border */}
          <style>{`
            .group-hover\\:border-gradient:hover {
              border-image: linear-gradient(90deg, #fcd34d, #44ff9a, #44b0ff, #ff6644) 1;
            }
            @keyframes border-pulse {
              0%, 100% { border-width: 4px; }
              50% { border-width: 8px; }
            }
            .group-hover\\:animate-border-pulse:hover {
              animation: border-pulse 1s infinite;
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
