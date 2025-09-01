import React from 'react';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../../components/footer/Footer';

const PrivacyPage = () => {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <section className="mb-6">
          <p>
            At HopeMeds, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard the information you provide when using our platform.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li>Personal identification details (name, email, contact information)</li>
            <li>Donation and medicine request history</li>
            <li>Location data to facilitate nearby medicine availability</li>
            <li>Authentication credentials and usage data</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            We use collected data to provide and improve our services, process donations and requests, communicate updates, and ensure security and compliance.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with authorized partners and service providers strictly to facilitate our services under confidentiality agreements.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data stored with HopeMeds. Contact us at{' '}
            <a href="mailto:privacy@hopemeds.org" className="text-emerald-600 hover:underline">
              privacy@hopemeds.org
            </a>{' '}
            for requests or inquiries.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            For any questions about this privacy policy or our data handling practices, please reach out at{' '}
            <a href="mailto:privacy@hopemeds.org" className="text-emerald-600 hover:underline">
              privacy@hopemeds.org
            </a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
