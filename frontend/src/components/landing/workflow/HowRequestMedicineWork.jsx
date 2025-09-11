import React from 'react';
import { steps } from './ImageData';

const HowRequestMedicineWork = () => (
  <div className="bg-white dark:bg-black pt-4 pb-16 px-4 transition-colors duration-300">
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-500 dark:text-teal-400 mb-6 transition-colors duration-300">
          How '''Request Medicine''' Work
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl font-heading mx-auto mb-8 transition-colors duration-300">
          Experience a secure and transparent process: easily request medicines, receive professional verification, and get safe doorstep delivery.
        </p>
      </div>
      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative h-full transform transition-transform duration-300 hover:scale-105"
          >
            <div
              className="
                border border-gray-200 dark:border-gray-700 
                rounded-xl p-6 shadow-sm dark:shadow-black/50 
                hover:shadow-md dark:hover:shadow-black/70 
                transition-shadow duration-300 h-full flex flex-col items-center
                bg-white dark:bg-gray-900
                hover:bg-gradient-to-br hover:from-teal-200 hover:to-emerald-300 dark:hover:from-teal-800/100 dark:hover:to-emerald-700/50
                hover:text-white dark:hover:text-white
              "
            >
              <img
                src={step.imgUrl}
                alt={step.imgAlt}
                className="w-32 h-32 object-contain mb-6 transition-filter duration-300"
                loading="lazy"
                style={{ filter: 'brightness(1)' }}
              />
              <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-2 text-center transition-colors duration-300 group-hover:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 text-center transition-colors duration-300 group-hover:text-white">
                {step.description}
              </p>
              <div className="mt-auto">
                <span className="text-green-500 font-medium text-sm group-hover:text-green-200 transition-colors duration-300">
                  {step.actionText}
                </span>
              </div>
            </div>
            {/* Arrow between cards */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a3a3a3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowRequestMedicineWork;
