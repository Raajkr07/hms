import React, { useState, useEffect } from "react";
import RatingStars from "./RatingStar";

const TestimonialCard = ({ testimonial }) => {
  const { quote, author, role, avatar, rating = 5 } = testimonial;
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 6; i++) {
        newParticles.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          scale: 1 + Math.random() * 0.5,
          animationDelay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <article
      className="
    group relative flex flex-col justify-between items-center py-6 px-4 sm:p-6 rounded-2xl h-[340px]
    bg-white/5 backdrop-blur-md
    border border-teal-200/20
    shadow-none
    overflow-hidden
    transition-all duration-700 ease-in-out
    hover:bg-gradient-to-br dark:hover:from-[#481D1D] dark:hover:to-[#481D1D]
    hover:border-teal-400 hover:border-2
    hover:shadow-[0_0_20px_2px_rgba(13,148,136,0.2)_inset]
    transform hover:scale-105
      "
      style={{
        fontFamily: "Poppins, sans-serif",
        transitionProperty: 'background, border-color, box-shadow, transform',
      }}
      role="group"
      aria-label={`Testimonial from ${author}`}
    >
      {/* Animated Inside Color Gradient on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(13.8899deg, rgba(13, 148, 136, 0) 0%, rgba(13, 148, 136, 0.3) 100%)",
          zIndex: 0,
        }}
      />

      {/* Floating Pulsing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-teal-400/30 animate-pulse"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              transform: `scale(${particle.scale})`,
              animationDelay: `${particle.animationDelay}s`,
              animation: `pulse 2s ease-in-out infinite ${particle.animationDelay}s, float 4s ease-in-out infinite ${particle.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center mb-2">
        <img
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-14 h-14 rounded-full object-cover border-4 border-primary-400 mb-1"
          loading="lazy"
        />
        <p className="font-bold text-base mt-1">{author}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{role}</p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center w-full overflow-visible">
        <RatingStars rating={rating} />
        <blockquote className="mt-2 flex-1 flex items-center w-full">
          <p
            className="text-base leading-relaxed text-center font-medium"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            “{quote}”
          </p>
        </blockquote>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(var(--scale));
          }
          50% {
            transform: translateY(-10px) scale(var(--scale));
          }
        }
      `}</style>
    </article>
  );
};

export default TestimonialCard;
