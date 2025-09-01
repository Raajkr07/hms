import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const FAQPage = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      question: 'What is HopeMeds?',
      answer:
        'HopeMeds is a platform that reduces medicine wastage by connecting donors, doctors, and beneficiaries to redistribute unused medicines safely.',
    },
    {
      question: 'How do I donate medicines?',
      answer:
        'You can donate by filling out the donation form with details about the medicines you want to donate. Our doctors will review and approve donations for safety.',
    },
    {
      question: 'Are there any medicines that cannot be donated?',
      answer:
        'Yes, expired, opened, or improperly stored medicines cannot be accepted. Please ensure medicines are unopened and valid before donating.',
    },
    {
      question: 'How does the medicine matching work?',
      answer:
        'When you request a medicine, the system searches nearby locations for available stock and reserves it for you while confirming pickup or delivery.',
    },
    {
      question: 'Is my personal information safe?',
      answer:
        'Absolutely. We follow strict privacy and security policies, ensuring your data is protected and only shared with authorized parties to facilitate services.',
    },
    {
      question: 'Who can approve donated medicines?',
      answer:
        'Licensed doctors registered on HopeMeds review and approve donations before medicines are added to the inventory.',
    },
  ];

  return (
    <>
      <LandingHeader onLogoClick={handleLogoClick} />
      <main
        role="main"
        className="max-w-4xl mx-auto p-6 mt-[80px] mb-16"
        style={{ fontFamily: 'merriweather, serif' }}
      >
        <h1 className="text-4xl font-bold mb-10">Frequently Asked Questions (FAQ)</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <section key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQPage;
