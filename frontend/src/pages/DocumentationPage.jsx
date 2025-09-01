import React, { useState } from 'react';
import Header from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const pricingPlans = [
  {
    title: 'Individual Helper',
    price: '₹0/monthly',
    description:
      'Perfect for individuals who want to donate unused medicines and help reduce medicine wastage in their community.',
    features: [
      'Register as medicine donor',
      'List up to 50 medicines monthly',
      'Basic expiry tracking',
      'Community impact dashboard',
      'SMS notifications for pickups',
    ],
  },
  {
    title: 'Community Champion',
    price: '₹299/monthly',
    description:
      'For pharmacies, clinics, and community leaders organizing larger medicine donation drives.',
    features: [
      'Bulk medicine entry system',
      'List up to 500 medicines monthly',
      'Advanced inventory management',
      'Donor & recipient matching',
      'Monthly impact reports',
      'Priority pickup scheduling',
    ],
  },
  {
    title: 'Healthcare Partner',
    price: '₹999/monthly',
    description:
      'Designed for hospitals, NGOs, and healthcare organizations managing large-scale medicine redistribution.',
    features: [
      'Unlimited medicine listings',
      'Multi-location management',
      'Staff access controls',
      'Integration with hospital systems',
      'Real-time wastage analytics',
      'Dedicated support manager',
    ],
  },
  {
    title: 'Impact Transformer',
    price: '₹2,999/monthly',
    description:
      'For government bodies, large NGOs, and philanthropic organizations creating systemic change in medicine accessibility.',
    features: [
      'City-wide medicine tracking',
      'Government integration APIs',
      'Custom reporting & analytics',
      'Multi-language support',
      'Priority technical support',
      'Impact measurement tools',
      'Policy recommendation engine',
    ],
  },
];

const PricingCard = ({ plan }) => (
  <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer">
    <h3 className="text-2xl font-bold mb-2 text-primary-600 dark:text-primary-400">{plan.title}</h3>
    <p className="text-xl font-semibold mb-4 text-primary-500">{plan.price}</p>
    <p className="text-neutral-700 dark:text-neutral-300 mb-6">{plan.description}</p>
    <ul className="flex-1 space-y-2 text-neutral-600 dark:text-neutral-400">
      {plan.features.map((feature, idx) => (
        <li key={idx} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
      {plan.price === '₹0/monthly' ? 'Start Helping' : 'Choose Plan'}
    </button>
  </div>
);

const DocumentationPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <div className="dark:bg-[#08090C] min-h-screen flex flex-col">
      <Header sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
      <main className="flex-1 p-6 max-w-full overflow-auto pt-[75px]">
        <section className="max-w-7xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary-600 dark:text-primary-400 mb-10">
            HopeMeds: Medicine Wastage Solution
          </h1>
          <p className="max-w-3xl mx-auto text-center text-neutral-700 dark:text-neutral-300 mb-8 text-lg">
            HopeMeds is your trustworthy platform for reducing medicine wastage,
            connecting individuals, doctors, and admins to improve community health. Join us in redistributing unused medicines, supporting vital NGOs, and optimizing resources for everyone.
          </p>
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-primary-600 dark:text-primary-400 text-center">
              Join the Medicine Sharing Revolution
            </h2>
            <p className="text-center text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Choose how you want to contribute to reducing medicine wastage and making healthcare accessible to all
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.title} plan={plan} />
              ))}
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default DocumentationPage;
