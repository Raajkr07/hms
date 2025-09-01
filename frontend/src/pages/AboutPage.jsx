import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const AboutPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-5xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-8">About HopeMeds</h1>
        <section className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            HopeMeds is a community-driven initiative aimed at reducing medicine wastage and improving healthcare accessibility. We empower individuals, healthcare professionals, and organizations to responsibly donate and redistribute unused medicines to those in need.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our mission is to create an efficient, transparent, and safe platform that connects donors, medical professionals, and beneficiaries, reducing waste and saving lives through the effective redistribution of medicines.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            HopeMeds is supported by a dedicated team of healthcare professionals, technologists, volunteers, and partners who share a passion for health equity and sustainability.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Whether you are a donor, doctor, NGO partner, or volunteer, there is a place for you at HopeMeds. Join us in making a meaningful impact on healthcare accessibility and environmental sustainability.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
