import React from "react";

const RatingStars = ({ rating }) => (
  <div className="flex justify-center space-x-1 mb-2" aria-label={`Rating: ${rating} out of 5 stars`} role="img">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 transition-colors duration-300 ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.757 4.635 1.122 6.545z"/>
      </svg>
    ))}
  </div>
);

export default RatingStars;
