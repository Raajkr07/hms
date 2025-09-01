import React from 'react';
import LandingHeader from '../landing/LandingHeader';
import Footer from '../../components/footer/Footer';

const AccessibilityPage = () => {
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
        <h1 className="text-3xl font-bold mb-6">Accessibility at HopeMeds</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Our Commitment</h2>
          <p>
            HopeMeds is committed to ensuring our website is accessible to everyone, including people with disabilities.
            We follow best practices to provide an inclusive experience.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Keyboard Navigation</h2>
          <p>
            All interactive elements are accessible via keyboard. Focus outlines and skip links are implemented to enhance navigation.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Screen Reader Support</h2>
          <p>
            We use semantic HTML elements and ARIA attributes where necessary to ensure compatibility with screen readers.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Color Contrast</h2>
          <p>
            Our color schemes meet WCAG AA standards for contrast ensuring readability in both light and dark modes.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Feedback</h2>
          <p>
            If you encounter any accessibility barriers, please contact us at{' '}
            <a href="mailto:accessibility@hopemeds.org" className="text-emerald-600 hover:underline">
              accessibility@hopemeds.org
            </a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AccessibilityPage;