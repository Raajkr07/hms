import React from 'react';
import LandingHeader from '../landing/LandingHeader';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const siteMapSections = [
    {
      title: 'Project',
      links: [
        { label: 'About HopeMeds', to: '/about' },
        { label: 'How it Works', to: '/how-it-works' },
        { label: 'Impact & Results', to: '/impact' },
        { label: 'Donate Medicines', to: '/donate' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', to: '/documentation' },
        { label: 'Contact Team', to: '/contact' },
        { label: 'FAQs', to: '/faq' },
        { label: 'Medicine Safety', to: '/safety' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Partner NGOs', to: '/partners' },
        { label: 'Volunteer Program', to: '/volunteers' },
        { label: 'Terms & Policies', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
      ],
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
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {siteMapSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <ul className="list-disc list-inside space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-emerald-600 hover:underline focus:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
};

export default SitemapPage;