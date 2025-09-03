import React from 'react';
import TestimonialCard from './TestimonialsCard';

const SaviourCard = ({ testimonials = [] }) => {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-black"
      aria-labelledby="testimonials-heading"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400" style={{ fontFamily: 'merriweather, serif' }}>
            {testimonials.length.toLocaleString()} people who have shared how HopeMeds helped deliver medicines and saved lives.
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-extrabold text-primary-600 dark:text-primary-400 sm:text-4xl xl:text-5xl tracking-tight"
            style={{ fontFamily: 'merriweather, serif' }}
          >
            Our Lifesavers
          </h2>
          
        </header>

        <div className="relative mt-10 md:mt-24">
          {/* Gradient background blur for both modes */}
          <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6 pointer-events-none select-none">
            <div
              className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
              style={{
                background:
                  'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
              }}
            />
          </div>

          <div className="relative grid grid-cols-1 gap-8 mx-auto w-full sm:max-w-xl md:max-w-3xl lg:max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard testimonial={testimonial} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaviourCard;
