import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const ContactPage = () => {
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
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <section className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We would love to hear from you! Whether you have questions, feedback, or want to get involved with HopeMeds, please reach out using the contact details below or fill out the contact form.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Email</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <a href="mailto:support@hopemeds.org" className="text-emerald-600 hover:underline">
              support@hopemeds.org
            </a>
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Phone</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            +91 79032*****
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
          <form
            className="max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for contacting HopeMeds! We will get back to you soon.');
            }}
          >
            <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="Your full name"
            />

            <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="you@example.com"
            />

            <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="Write your message here"
            />

            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
