import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Footer from '../components/footer/Footer';

const DonatePage = () => {
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
        <h1 className="text-4xl font-bold mb-8">Donate Medicines</h1>
        <section className="mb-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            Thank you for your generosity in choosing to donate unused medicines. Your contribution helps reduce waste and improves healthcare access to those in need.
          </p>
          <p className="mt-4">
            Please ensure any medicines you donate are unopened, properly stored, and within their expiry date. Our doctors will review all donations for safety and compliance.
          </p>
        </section>
        <section>
          <form
            className="max-w-lg space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for your donation submission! Our doctors will review and validate shortly.');
              e.target.reset();
            }}
          >
            <div>
              <label htmlFor="medicineName" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Medicine Name
              </label>
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                required
                placeholder="Enter medicine name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="Enter brand (optional)"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="dosage" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Dosage (e.g., 500mg)
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                required
                placeholder="Enter dosage"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="form" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Form
              </label>
              <select
                id="form"
                name="form"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                defaultValue=""
              >
                <option value="" disabled>
                  Select form
                </option>
                <option value="TABLET">Tablet</option>
                <option value="CAPSULE">Capsule</option>
                <option value="SYRUP">Syrup</option>
                <option value="OINTMENT">Ointment</option>
                <option value="INJECTION">Injection</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                required
                placeholder="Enter quantity"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="batchNo" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Batch Number
              </label>
              <input
                type="text"
                id="batchNo"
                name="batchNo"
                placeholder="Enter batch number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="storageCondition" className="block mb-2 font-medium text-gray-900 dark:text-gray-100">
                Storage Condition
              </label>
              <select
                id="storageCondition"
                name="storageCondition"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                defaultValue=""
              >
                <option value="" disabled>
                  Select storage condition
                </option>
                <option value="ROOM">Room Temperature</option>
                <option value="COOL">Cool</option>
                <option value="REFRIGERATED">Refrigerated</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            >
              Submit Donation
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DonatePage;
