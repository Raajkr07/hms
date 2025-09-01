import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const PartnersPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const partners = [
    {
      name: 'HealthForAll NGO',
      description: 'An NGO dedicated to providing healthcare in underserved regions.',
      website: 'https://healthforall.org',
    },
    {
      name: 'Medic Supply Chain Inc.',
      description: 'A company specializing in safe medicine logistics and distribution.',
      website: 'https://medicsupplychain.com',
    },
    {
      name: 'GreenCare Volunteers',
      description: 'Volunteers committed to environmental sustainability in healthcare.',
      website: 'https://greencarevolunteers.org',
    },
    {
      name: 'Doctors United',
      description: 'A network of licensed doctors collaborating for community health.',
      website: 'https://doctorsunited.org',
    },
  ];

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-5xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-10 text-center">Our Partners</h1>
        <p className="mb-8 text-center max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          HopeMeds works closely with a diverse range of partners from NGOs, companies, volunteers, and medical professionals. Their invaluable support ensures the smooth operation and extension of our mission.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {partners.map(({ name, description, website }) => (
            <div
              key={name}
              className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 shadow-lg bg-white dark:bg-gray-900 flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{name}</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Visit Website
              </a>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PartnersPage;
