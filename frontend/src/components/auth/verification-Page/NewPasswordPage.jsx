import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconHeartbeat, IconShield } from '@tabler/icons-react';
import Footer from '../../footer/SocialFooter';
import apiClient from '../../../api/axios';

const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>/?]).{8,}$/.test(password);

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(3);
  const [showTimer, setShowTimer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // this will try to get reset token from query params
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get('token') || (location.state && location.state.token);

  const isFormValid =
    password &&
    confirmPassword &&
    password === confirmPassword &&
    validatePassword(password);

  useEffect(() => {
    let interval;
    if (showTimer && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (showTimer && timer === 0) {
      navigate('/login');
    }
    return () => clearInterval(interval);
  }, [showTimer, timer, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');
    setSuccess('');

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
      );
      return;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }
    if (!resetToken) {
      setError('Reset token is missing. Please retry the process.');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/account/reset-password', {
        token: resetToken,
        newPassword: password,
      });
      setSuccess('Password has been successfully reset!');
      setPassword('');
      setConfirmPassword('');
      setShowTimer(true);
      setTimer(3);
    } catch (err) {
      if (err.isBackendDown) setError(err.message);
      else setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen min-h-screen flex flex-col bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white opacity-5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-teal-700 opacity-30 rounded-full pointer-events-none" />

      <main className="flex-1 flex flex-col md:flex-row w-full h-[calc(100vh-70px)] relative z-10 overflow-hidden">
        <section
          aria-hidden="true"
          className="hidden md:flex md:flex-1 flex-col relative select-none text-white justify-between max-w-lg pl-6 pt-4"
        >
          <div className="flex gap-2 items-center blinking-shine">
            <IconHeartbeat size={40} stroke={2.5} className="text-primary-200" />
            <span className="font-heading text-3xl font-semibold text-primary-200">HopeMeds</span>
          </div>

          <section className="my-20 space-y-6 max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight">Reset Password</h1>
            <p className="text-lg text-teal-100 leading-relaxed">Create your new password below.</p>
            <ul className="space-y-4 text-teal-100">
              <li className="flex items-start">
                <span className="mr-2">
                  <IconShield className="text-purple-400 w-6 h-6 mt-1" />
                </span>
                Safe &amp; trusted platform
              </li>
              <li>Secure and easy password recovery</li>
              <li>Get help promptly without hassle</li>
            </ul>
          </section>
        </section>

        <article className="flex-1 flex items-center justify-center py-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10"
            noValidate
            aria-labelledby="new-password-title"
          >
            <header className="mb-8 text-center">
              <h2 id="new-password-title" className="text-3xl font-extrabold text-primary-400">
                Set New Password
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                Create a secure new password for your HopeMeds account.
              </p>
            </header>

            {error && (
              <div
                role="alert"
                className="mb-6 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm"
              >
                {error}
              </div>
            )}
            {success && !showTimer && (
              <div
                role="alert"
                className="mb-6 rounded-md bg-green-50 border border-green-200 p-3 text-green-700 text-sm"
              >
                {success}
              </div>
            )}

            {!showTimer ? (
              <>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                    New Password <span aria-hidden="true" className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby="password-error password-requirements"
                    aria-invalid={!!passwordError}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a new password"
                    required
                  />
                  <div id="password-requirements" className="mt-1 text-teal-600 text-xs">
                    • Minimum 8 characters
                    <br />
                    • At least 1 uppercase, 1 digit, 1 special character
                  </div>
                  {passwordError && (
                    <p id="password-error" className="mt-1 text-red-600 text-sm">
                      {passwordError}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                    Confirm Password <span aria-hidden="true" className="text-red-600">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-describedby="confirmPassword-error"
                    aria-invalid={!!confirmPasswordError}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                      confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Repeat your new password"
                    required
                  />
                  {confirmPasswordError && (
                    <p id="confirmPassword-error" className="mt-1 text-red-600 text-sm">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white font-semibold py-3 rounded-lg shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 transition transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
                  disabled={isLoading || !isFormValid}
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Set Password'
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-2xl font-bold text-teal-700 mb-4">Redirecting to login in</div>
                <div className="text-5xl font-extrabold relative w-32 h-32 mx-auto flex flex-col items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden bg-teal-100 relative">
                      <div
                        className="absolute left-0 bottom-0 w-full bg-teal-400"
                        style={{
                          height: `${((4 - timer) / 3) * 100}%`,
                          transition: 'height 1s cubic-bezier(.25,.8,.25,1)',
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-teal-700 select-none">
                        {timer}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-teal-600 text-lg font-medium">
                  You will be redirected. Please wait...
                </div>
              </div>
            )}
          </form>
        </article>
      </main>

      <footer className="h-[70px] w-full shrink-0">
        <Footer />
      </footer>
    </div>
  );
}
