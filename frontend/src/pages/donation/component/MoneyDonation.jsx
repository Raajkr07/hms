import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function MoneyDonation({ plans = [], onSubmit, darkMode = true }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    pan: '',
    address: '',
    isAdult: false,
    newsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCustomAmount('');
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedPlan(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Get donation amount from selected plan or custom input
  const getSelectedAmount = () => {
    if (customAmount && Number(customAmount) >= 1) {
      return Number(customAmount);
    }
    if (selectedPlan) {
      return selectedPlan.amount;
    }
    return 0;
  };

  // Validate inputs before submitting payment
  const validate = () => {
    if (getSelectedAmount() < 1) {
      setError('Minimum donation amount is ₹1.');
      return false;
    }
    if (!form.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!form.isAdult) {
      setError('You must declare that you are above 18 years of age and a resident of India.');
      return false;
    }
    setError(null);
    return true;
  };

  // Handle submit to trigger Razorpay payment flow
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Call parent onSubmit that should trigger backend order creation and Razorpay checkout
      await onSubmit(getSelectedAmount(), form);
      // Success message can optionally be handled here or in parent after payment confirmation
      // But Razorpay flow itself will confirm payment success after checkout 
    } catch (err) {
      setError(err.message || 'An error occurred during donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-12 ${darkMode ? 'dark:bg-black bg-white' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">Choose Your Impact Level</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Every contribution creates measurable change. Select an amount that matches your commitment.
          </p>
        </div>

        {/* Donation Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => handlePlanSelect(plan)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePlanSelect(plan)}
              className={`relative cursor-pointer transition-transform duration-300 transform border-none hover:scale-105 ${
                selectedPlan?.name === plan.name ? 'ring-4 ring-blue-500 rounded-2xl' : ''
              } ${plan.popular ? 'lg:-mt-4' : ''}`}
              aria-pressed={selectedPlan?.name === plan.name ? 'true' : 'false'}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold select-none">
                  Most Popular
                </div>
              )}

              <div className={`bg-gradient-to-br ${plan.color} p-6 rounded-2xl text-white h-full flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <plan.icon className="w-8 h-8" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">₹{plan.amount.toLocaleString()}</div>
                    <div className="text-sm opacity-80">one-time</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                <p className="text-sm mb-4 opacity-90 flex-grow">{plan.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Or enter amount:</p>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Min amount ₹1"
            aria-label="Custom donation amount"
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-center text-xl font-semibold w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Donation Form */}
      <section className={`py-16 ${darkMode ? 'dark:bg-black bg-white' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-slate-700 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 dark:text-white text-black">Complete Your Donation</h2>
              {getSelectedAmount() > 0 && (
                <div className="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-6 py-3 rounded-full text-lg font-semibold select-none">
                  of Amount: ₹{getSelectedAmount().toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  aria-label="Full Name"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Email Address *"
                  aria-label="Email Address"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile Number *"
                  aria-label="Mobile Number"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                  type="text"
                  name="pan"
                  value={form.pan}
                  onChange={handleInputChange}
                  placeholder="PAN Number (for 80G receipt)"
                  aria-label="PAN Number"
                  className="border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Address (Optional)"
                aria-label="Address"
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <div className="space-y-3">
                <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isAdult"
                    checked={form.isAdult}
                    onChange={handleInputChange}
                    required
                    className="mt-1 accent-blue-500"
                  />
                  <span className="text-sm">
                    I declare that I am above 18 years of age and a resident of India. I understand this donation will help redistribute medicines to those in need.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleInputChange}
                    className="mt-1 accent-blue-500"
                  />
                  <span className="text-sm">Send me impact updates and success stories from our community.</span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={getSelectedAmount() < 1 || loading}
                type="button"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-disabled={getSelectedAmount() < 1 || loading}
              >
                <Heart className="w-6 h-6" />
                {loading ? 'Processing...' : `Donate ₹${getSelectedAmount().toLocaleString()} Now`}
                <ArrowRight className="w-5 h-5" />
              </button>

              {error && (
                <p className="text-center text-red-600 dark:text-red-400 mt-4" role="alert" aria-live="assertive">
                  {error}
                </p>
              )}
              {successMessage && (
                <p className="text-center text-green-700 dark:text-green-300 mt-4" role="alert" aria-live="polite">
                  {successMessage}
                </p>
              )}

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 select-none">
                <p>🔒 Secure payment powered by Razorpay • 80G Tax exemption available</p>
                <p className="mt-1">Your donation will be processed within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
