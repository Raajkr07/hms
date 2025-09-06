import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconHeartbeat } from '@tabler/icons-react';
import Footer from '../../footer/SocialFooter';
import apiClient from '../../../api/axios';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// const validateOtp = (otp) => otp === '123456';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setOtpError('');
  if (!email.trim()) {
    setError('Email is required');
    return;
  }
  if (!validateEmail(email)) {
    setError('Please enter a valid email address');
    return;
  }
  setIsLoading(true);
  try {
    const res = await apiClient.post('/account/forgot-password', { email });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess('Password sent to your email. Please enter the OTP below.');
    setShowOtpInput(true);
  } catch (err) {
    if (err.isBackendDown) setError(err.message);
    else setError(err.message || 'Failed to send password reset email');
  } finally {
    setIsLoading(false);
  }
};


  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setOtpError('');
  if (!otp.trim()) {
    setOtpError('OTP is required');
    return;
  }
  if (!/^\d{6}$/.test(otp)) {
    setOtpError('OTP must be a 6-digit number');
    return;
  }
  setIsLoading(true);
  try {
    const response = await apiClient.post('/account/verify-otp', { email, otp });
    if (response.data.success) {
      navigate(`/new-password?token=${response.data.token}`);
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  } catch (err) {
    if (err.isBackendDown) setOtpError(err.message);
    else setOtpError(err.message || 'Failed to verify OTP');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="h-screen min-h-screen flex flex-col bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white opacity-5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-teal-700 opacity-30 rounded-full pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row w-full h-[calc(100vh-70px)] overflow-hidden relative z-10">
        <section
          aria-hidden="true"
          className="hidden md:flex md:flex-1 flex-col relative select-none text-white justify-between max-w-lg pl-6 pt-4"
        >
          <div className="flex gap-2 items-center blinking-shine">
            <IconHeartbeat size={40} stroke={2.5} className="text-primary-200" />
            <span className="font-heading text-3xl font-semibold text-primary-200">
              HopeMeds
            </span>
          </div>

          <section className="my-20 space-y-6 max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight">
              Reset Password
            </h1>
            <p className="text-lg text-teal-100 leading-relaxed">
              Enter your registered email address, and we'll send you an OTP to reset your password.
            </p>
            <ul className="space-y-4 text-teal-100 list-disc list-inside">
              <li>Secure and easy password recovery</li>
              <li>Get help promptly without hassle</li>
              <li>Safe & trusted platform</li>
            </ul>
          </section>
        </section>

        {/* Right Form Section */}
        <section className="flex-1 flex items-center justify-center py-10 px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 overflow-auto ">
          <form
            onSubmit={showOtpInput ? handleVerifyOtp : handleSendEmail}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10"
            noValidate
            aria-labelledby="forgot-password-title"
          >
            <header className="mb-8 text-center">
              <h2 id="forgot-password-title" className="text-3xl font-extrabold text-primary-400">
                Forgot Password
              </h2>
              <p className="mt-2 text-gray-600 text-sm">Enter your email to receive OTP</p>
            </header>

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                role="alert"
                className="mb-6 rounded-md bg-green-50 border border-green-200 p-3 text-green-700 text-sm"
              >
                {success}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email <span aria-hidden="true" className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-error"
                  aria-invalid={!!error}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="you@example.com"
                  required
                  spellCheck="false"
                  disabled={showOtpInput}
                />
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 text-gray-400 w-5 h-5"
                />
              </div>
              {error && (
                <p id="email-error" className="mt-1 text-red-600 text-sm">
                  {error}
                </p>
              )}
            </div>

            {showOtpInput && (
              <div className="mb-6">
                <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">
                  OTP <span aria-hidden="true" className="text-red-600">*</span>
                </label>
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpError('');
                  }}
                  maxLength={6}
                  aria-describedby="otp-error"
                  aria-invalid={!!otpError}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${otpError ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter the 6-digit OTP"
                  required
                />
                {otpError && (
                  <p id="otp-error" className="mt-1 text-red-600 text-sm">
                    {otpError}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 transition transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  {showOtpInput ? 'Verifying...' : 'Sending...'}
                </span>
              ) : showOtpInput ? (
                'Verify OTP'
              ) : (
                'Send OTP'
              )}
            </button>

            <div className="mt-6 text-center text-gray-600 text-sm">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="h-[70px] w-full shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
