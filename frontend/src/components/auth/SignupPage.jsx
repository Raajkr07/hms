// SignupPage.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Shield, Stethoscope, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IconHeartbeat } from '@tabler/icons-react';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const USER_ROLES = {
  PATIENT: {
    value: 'patient',
    label: 'Patient',
    icon: Heart,
    color: 'bg-blue-500',
    description: 'Receive donated medicines',
  },
  DOCTOR: {
    value: 'doctor',
    label: 'Doctor',
    icon: Stethoscope,
    color: 'bg-green-500',
    description: 'Verify medicine safety',
  },
  ADMIN: {
    value: 'admin',
    label: 'Admin',
    icon: Shield,
    color: 'bg-purple-500',
    description: 'Manage distribution network',
  },
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    role: 'patient',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    licenseNumber: '',
    department: '',
    termsAccepted: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    validateField('email', formData.email);
    validateField('password', formData.password);
    if (formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  }, [formData.email, formData.password, formData.confirmPassword]);

  const validateField = (fieldName, value) => {
    let fieldErrors = { ...errors };
    switch (fieldName) {
      case 'email':
        if (!value) {
          fieldErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          fieldErrors.email = 'Please enter a valid email address';
        } else {
          delete fieldErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          fieldErrors.password = 'Password is required';
        } else if (!validatePassword(value)) {
          fieldErrors.password =
            'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        } else {
          delete fieldErrors.password;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          fieldErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          fieldErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete fieldErrors.confirmPassword;
        }
        break;
      case 'fullName':
        if (!value) {
          fieldErrors.fullName = 'Full name is required';
        } else if (value.length < 2) {
          fieldErrors.fullName = 'Name must be at least 2 characters';
        } else {
          delete fieldErrors.fullName;
        }
        break;
      case 'phoneNumber':
        if (!value) {
          fieldErrors.phoneNumber = 'Phone number is required';
        } else if (!validatePhoneNumber(value)) {
          fieldErrors.phoneNumber = 'Please enter a valid phone number';
        } else {
          delete fieldErrors.phoneNumber;
        }
        break;
      case 'dateOfBirth':
        if (!value) {
          fieldErrors.dateOfBirth = 'Date of birth is required';
        } else {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          if (age < 13) {
            fieldErrors.dateOfBirth = 'Must be at least 13 years old';
          } else {
            delete fieldErrors.dateOfBirth;
          }
        }
        break;
      case 'licenseNumber':
        if (formData.role === 'doctor' && !value) {
          fieldErrors.licenseNumber = 'Medical license number is required for doctors';
        } else {
          delete fieldErrors.licenseNumber;
        }
        break;
      case 'specialization':
        if (formData.role === 'doctor' && !value) {
          fieldErrors.specialization = 'Specialization is required for doctors';
        } else {
          delete fieldErrors.specialization;
        }
        break;
      case 'termsAccepted':
        if (!value) {
          fieldErrors.termsAccepted = 'You must accept the terms and conditions';
        } else {
          delete fieldErrors.termsAccepted;
        }
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
    if (type !== 'checkbox') {
      validateField(name, newValue);
    }
  };

  const handleRoleChange = (roleValue) => {
    setFormData((prev) => ({
      ...prev,
      role: roleValue,
      specialization: '',
      licenseNumber: '',
      department: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'fullName',
      'phoneNumber',
      'dateOfBirth',
      'termsAccepted',
    ];
    if (formData.role === 'doctor') requiredFields.push('specialization', 'licenseNumber');
    if (formData.role === 'admin') requiredFields.push('department');

    let hasErrors = false;
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        validateField(field, formData[field]);
        hasErrors = true;
      }
    });

    if (hasErrors || Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      }));
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-teal-700 opacity-3 rounded-full"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Brand/Hero */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Logo */}
          <div className="flex gap-2 items-center blinking-shine">
            <IconHeartbeat size={40} stroke={2.5} className="text-primary-200" />
            <span className="font-heading text-3xl font-semibold text-primary-200">HopeMeds</span>
          </div>

          <div className="text-white max-w-lg">
            <h1 className="text-5xl font-bold leading-tight mb-6">Reducing Medicine Waste, Saving Lives.</h1>
            <p className="text-xl text-teal-100 leading-relaxed mb-8">
              Connect unused medicines with those who need them most. Join our mission to eliminate medicine wastage and
              make healthcare accessible to everyone.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-blue-300" />
                <span className="text-teal-100">Patients - Find affordable medicines and connect with NGOs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-6 h-6 text-green-300" />
                <span className="text-teal-100">Doctors - Verify medicine quality and approve donations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-purple-300" />
                <span className="text-teal-100">Admins - Oversee distribution network and partnerships</span>
              </div>
            </div>
          </div>

          <div className="text-teal-200 text-sm">© 2025 HopeMeds. Fighting medicine wastage together.</div>
        </div>

        {/* Right Side - Form Container */}
        <div className="w-[600px] flex items-center justify-center py-8 px-8 relative z-20">
          <div className="w-full bg-white rounded-3xl shadow-2xl p-8 max-h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Join HopeMeds</h2>
              <h3 className="text-xl font-medium text-gray-600 mb-4">Help reduce medicine waste</h3>
              <p className="text-gray-500 text-sm">Create an account to start helping others</p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{errors.submit}</div>
            )}

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(USER_ROLES).map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleChange(role.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 relative z-10 ${
                        formData.role === role.value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 ${role.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                      >
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{role.label}</div>
                      <div className="text-xs text-gray-500 leading-tight">{role.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.fullName && touched.fullName ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter your full name"
                  />
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.fullName && touched.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.email && touched.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.email && touched.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.phoneNumber && touched.phoneNumber ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                      errors.dateOfBirth && touched.dateOfBirth ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {formData.role === 'doctor' && (
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialization *</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.specialization && touched.specialization ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select Specialization</option>
                      <option value="general-medicine">General Medicine</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="endocrinology">Endocrinology</option>
                      <option value="gastroenterology">Gastroenterology</option>
                      <option value="neurology">Neurology</option>
                      <option value="oncology">Oncology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="psychiatry">Psychiatry</option>
                    </select>
                    {errors.specialization && touched.specialization && (
                      <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number *</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.licenseNumber && touched.licenseNumber ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="Enter your medical license number"
                    />
                    {errors.licenseNumber && touched.licenseNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                    )}
                  </div>
                </div>
              )}

              {formData.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="distribution">Distribution Management</option>
                    <option value="ngo-partnerships">NGO Partnerships</option>
                    <option value="quality-assurance">Quality Assurance</option>
                    <option value="operations">Operations</option>
                    <option value="community-outreach">Community Outreach</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12 ${
                      errors.password && touched.password ? 'border-red-300' : 'border-gray-200'
                    }`}
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
                {errors.password && touched.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                <div className="mt-2 text-xs text-gray-500">
                  Password must contain at least 8 characters with uppercase, lowercase, number, and special character
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12 ${
                      errors.confirmPassword && touched.confirmPassword ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    className="absolute right-3 top-3 w-5 h-5 text-gray-400 hover:text-gray-600 z-10 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to help reduce medicine waste and follow{' '}
                    <button
                      type="button"
                      className="text-teal-600 hover:text-teal-700 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Terms of Service will be displayed here');
                      }}
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      className="text-teal-600 hover:text-teal-700 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Privacy Policy will be displayed here');
                      }}
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 relative z-10 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Join HopeMeds'
                )}
              </button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}