import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Shield, Stethoscope, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconHeartbeat } from '@tabler/icons-react';
import Footer from '../footer/SocialFooter';
import apiClient from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => (
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
);

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false, role: 'patient' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();

  useEffect(() => {
    validateField('email', formData.email);
    validateField('password', formData.password);
  }, [formData.email, formData.password]);

  const validateField = (fieldName, value) => {
    let fieldErrors = { ...errors };
    switch (fieldName) {
      case 'email':
        if (!value) fieldErrors.email = 'Email is required';
        else if (!validateEmail(value)) fieldErrors.email = 'Please enter a valid email address';
        else delete fieldErrors.email;
        break;
      case 'password':
        if (!value) fieldErrors.password = 'Password is required';
        else if (!validatePassword(value)) fieldErrors.password =
          'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        else delete fieldErrors.password;
        break;
      default:
        break;
    }
    setErrors(fieldErrors);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (type !== 'checkbox') validateField(name, newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading) return;

    // Client-side validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await apiClient.post('/account/login', {
        email: formData.email,
        password: formData.password,
      });
      // Validate response structure
      if (!response.data || !response.data.token) {
        throw new Error('Invalid response: missing token');
      }

      const { token, id, email, fullName, role } = response.data;

      // Validate required fields
      if (!id || !email || !role) {
        throw new Error('Invalid response: missing user data');
      }

      const userData = {
        id,
        email,
        fullName: fullName || email, // Fallback if fullName is missing
        role,
      };

      // Use AuthContext login (handles navigation)
      const result = await login(token, userData);

      if (!result.success) {
        throw new Error(result.error || 'Login failed');
      }

      // Optional: Clear form on success
      setFormData({ email: '', password: '', rememberMe: false, role: 'patient' });

    } catch (err) {

      let errorMessage = 'Login failed. Please try again.';
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        // Extract error message from either 'message' or 'error' key
        const serverMessage = data.message || data.error || '';

        switch (status) {
          case 400:
            errorMessage = 'Invalid credentials, please signup';
            break;
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 403:
            errorMessage = 'Account suspended. Please contact support.';
            break;
          case 429:
            errorMessage = 'Too many login attempts. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = serverMessage || errorMessage;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }

  };

  // Check if submitting
  const isSubmitting = isLoading || authLoading;

  return (
    <div className="h-screen min-h-screen flex flex-col bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full pointer-events-none"></div>
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white opacity-5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-primary-700 opacity-30 rounded-full pointer-events-none"></div>

      <main className="flex-1 flex w-full h-[calc(100vh-70px)] relative z-10 overflow-hidden">
        <section
          aria-hidden="true"
          className="hidden md:flex md:flex-1 flex-col relative select-none text-white justify-between max-w-lg pl-6 pt-4"
        >
          <div className="flex gap-2 items-center blinking-shine">
            <IconHeartbeat size={40} stroke={2.5} className="text-primary-200" />
            <span className="font-heading text-3xl font-semibold text-primary-200">HopeMeds</span>
          </div>
          <section className="mt-10 space-y-6">
            <h2 className="text-5xl font-extrabold leading-tight">
              Reducing Medicine <span className='text-[#FACC15]'>waste</span>, Saving Lives.
            </h2>
            <div className="space-y-4 text-teal-100 max-w-md">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-blue-300" />
                <span className="text-base">
                  Patients - Find affordable medicines and connect with NGOs
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-6 h-6 text-green-300" />
                <span className="text-base">
                  Doctors - Verify medicine quality and approve donations
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-purple-300" />
                <span className="text-base">
                  Admins - Oversee distribution network and partnerships
                </span>
              </div>
            </div>
          </section>
        </section>

        {/* Form section */}
        <section className="flex items-center justify-center h-full w-full max-w-full md:max-w-xl mx-auto px-2 md:px-8 mr-6 pt-4">
          <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl pt-6 md:pt-8 px-4 md:pl-10 md:pr-10 pb-4 max-h-full flex flex-col justify-center">
            <div className="text-center mb-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-400 mt-2 md:mt-3 mb-2">Welcome Back</h2>
              <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-3 md:mb-4">
                Sign in to your account
              </h3>
              <p className="text-gray-500 text-xs md:text-sm">Enter your credentials to continue</p>
            </div>
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs md:text-sm">
                {errors.submit}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`
            w-full px-3 py-2 md:px-4 md:py-3 
            bg-white text-gray-700  border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
            transition-all 
            ${errors.email && touched.email ? 'border-red-300' : 'border-gray-200'}
          `}
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs md:text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onInput={handleInputChange}
                    className={`
            w-full px-3 py-2 md:px-4 md:py-3 
            bg-white text-gray-700  border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent 
            transition-all pr-10 md:pr-12 
            ${errors.password && touched.password ? 'border-red-300' : 'border-gray-200'}
          `}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-3 top-3 w-5 h-5 text-gray-400 hover:text-gray-600 z-10 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs md:text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="ml-2 text-gray-600">Remember for 30 days</span>
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/forgot-password');
                  }}
                  className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 relative z-10 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs md:text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
                  }}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 md:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer relative z-10"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Microsoft login functionality will be implemented here');
                  }}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 md:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer relative z-10"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M13 1h10v10H13z" />
                    <path fill="#05a6f0" d="M1 13h10v10H1z" />
                    <path fill="#ffba08" d="M13 13h10v10H13z" />
                  </svg>
                  Microsoft
                </button>
              </div>
            </form>
            <div className="text-center text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
              New to HopeMeds?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer"
              >
                Join now
              </button>
            </div>
          </div>
        </section>

      </main>
      <footer className="h-[70px] w-full shrink-0">
        <Footer />
      </footer>
    </div>
  );
}