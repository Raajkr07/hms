import React, { useState } from 'react';
import joinUsImage from '../../../assets/join-us.png';

const NewInvite = () => {
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [errors, setErrors] = useState({ email: '', contactNo: '' });
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateContactNo = (number) => {
    const re = /^\d{10}$/;
    return re.test(number);
  };

  const handleSubmit = (e) => {
    if (!validateEmail(email) || !validateContactNo(contactNo)) {
      e.preventDefault();
      setErrors({
        email: validateEmail(email) ? '' : 'Please enter a valid email address.',
        contactNo: validateContactNo(contactNo) ? '' : 'Please enter a valid 10-digit contact number.',
      });
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-black max-w-md mx-auto p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-primary-500 mb-4">Thank you!</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">We will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
      <section className="pb-4 sm:pt-16 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center max-w-lg mx-auto lg:max-w-full">
          {/* Left Content */}
          <div>
            <h1 className="text-3xl font-extrabold text-primary-500 sm:text-3xl lg:text-4xl font-pj leading-tight">
              A special approach to medicine donation and <span className="text-[#FACC15]">wastage</span> reduction.
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-heading max-w-md">
              Join HopeMeds today to help turn medicine surplus into hope for millions in need worldwide.
            </p>

            <form
              name="new-invite"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-8 max-w-md"
            >
              <input type="hidden" name="form-name" value="new-invite" />

              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200`}
                  required
                  aria-describedby="email-error"
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contactNo" className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  pattern="\d{10}"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.contactNo ? 'border-red-500' : 'border-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200`}
                  required
                  aria-describedby="contactNo-error"
                />
                {errors.contactNo && (
                  <p id="contactNo-error" className="mt-1 text-sm text-red-600">
                    {errors.contactNo}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-3 font-bold text-white bg-primary-500 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition"
              >
                Join us, Give Hope
              </button>
            </form>
          </div>

          <div className="mx-auto max-w-md lg:mx-0 lg:max-w-full">
            <img
              src={joinUsImage}
              alt="Medicine donation illustration"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewInvite;
