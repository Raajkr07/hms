import React, { useState } from 'react';
import heroImagetint from '../../assets/hero-section1.png';
import heroImageblack from '../../assets/medicine-recycle-light.png';
import { HeartbeatLine } from '../HeartBeatLine';

export default function HeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="overflow-x-hidden">
      <section className="max-w-7xl mx-auto pt-12 pb-4 px-6 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:flex-1 text-center md:text-left">
            <h1 className="text-6xl font-extrabold text-primary-600 mb-6">
              Reducing Medicine Waste, Saving Lives
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
              HopeMeds connects unused medicines with those who need them most. Join our mission to eliminate medicine wastage and make healthcare accessible to everyone.
            </p>
          </div>
          <div className="md:flex-1">
            <img
              src={isDarkMode ? heroImageblack : heroImagetint}
              alt="Medicine Waste Reduction Illustration"
              className="w-full max-w-md mx-auto cursor-pointer border-4 border-blue-500"
              onClick={toggleMode}
            />
          </div>
        </div>

        <HeartbeatLine />
      </section>
    </div>
  );
}
