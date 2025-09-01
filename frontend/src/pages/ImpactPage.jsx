import React from 'react';
import { statsData } from '../data/Data';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const ImpactPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-6xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-10 text-center">Our Impact</h1>
        <section className="mb-12 max-w-3xl mx-auto text-center text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            HopeMeds has made significant strides in reducing medicine wastage and improving access to quality healthcare through community collaboration. Here are some key highlights of our collective efforts so far.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
          {statsData.map(({ icon, label, value, color }) => (
            <div
              key={label}
              className={`rounded-lg p-6 shadow-md flex flex-col justify-center items-center ${color} text-white`}
            >
              <div className="mb-3">{icon}</div>
              <span className="text-3xl font-extrabold">{value}</span>
              <span className="mt-2 text-lg font-medium">{label}</span>
            </div>
          ))}
        </section>

        <section className="mt-16 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-6">
          <p>
            Every donation, every doctor’s review, and every partner contribution helps save lives and reduces the environmental impact of wasted medicines. Together, we are building healthier, more sustainable communities.
          </p>
          <p>
            Join us in this mission to expand our reach and deepen our impact by donating, volunteering, or partnering with HopeMeds.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ImpactPage;
