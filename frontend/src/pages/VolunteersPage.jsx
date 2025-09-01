import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const VolunteersPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-4xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-8">Volunteer Program</h1>
        <section className="mb-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            Join the HopeMeds Volunteer Program and make a tangible difference in reducing medicine wastage and improving healthcare access.
            Volunteers help with outreach, education, sorting medicines, and supporting our partner organizations.
          </p>
          <p className="mt-4">
            Whether you have a little or a lot of time, your involvement can help save lives and promote sustainable healthcare.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Who Can Volunteer?</h2>
          <p>
            Anyone passionate about community health and sustainability can participate. No prior medical experience is required for most roles.
            Specific roles may include logistics, communication, event planning, and medicine sorting.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
          <p>
            Fill out the volunteer application form on our website or contact us directly at{' '}
            <a href="mailto:volunteers@hopemeds.org" className="text-emerald-600 hover:underline">
              volunteers@hopemeds.org
            </a>.
            We will get back to you with opportunities and next steps.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Volunteer Benefits</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>Meaningful impact in community health and sustainability</li>
            <li>Training and support from healthcare professionals</li>
            <li>Certificates and recognition for your contributions</li>
            <li>Networking opportunities with NGOs and healthcare partners</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VolunteersPage;
