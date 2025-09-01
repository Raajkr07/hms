import React from 'react';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../../components/footer/Footer';

const TermsPage = () => {
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
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <section className="mb-6">
          <p>
            Welcome to HopeMeds. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Use of Platform</h2>
          <p>
            HopeMeds is for legally donating and requesting medicines to reduce wastage. Users must ensure the information they provide is accurate and comply with all applicable laws.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
          <p>
            Users, including donors, doctors, and admins, must act ethically, respect privacy, and not misuse the system. Doctors should diligently review and approve donations.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Warranty and Liability</h2>
          <p>
            HopeMeds provides the platform “as is.” We do not warrant the accuracy or safety of medicines donated, and users assume all risks related to donation and usage.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
          <p>
            All content and software on HopeMeds are protected by intellectual property laws. Unauthorized use is prohibited.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:terms@hopemeds.org" className="text-emerald-600 hover:underline">
              terms@hopemeds.org
            </a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
