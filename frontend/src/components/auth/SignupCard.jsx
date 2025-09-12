import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Eye, EyeOff, User, Mail, Shield, Stethoscope, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
const validatePhoneNumber = (phone) => /^\+?[\d\s\-\(\)]{10,}$/.test(phone);

const USER_ROLES = {
  PATIENT: {
    value: 'PATIENT',
    label: 'Patient',
    icon: Heart,
    color: 'bg-blue-500',
  },
  DOCTOR: {
    value: 'DOCTOR',
    label: 'Doctor',
    icon: Stethoscope,
    color: 'bg-green-500',
  },
  ADMIN: {
    value: 'ADMIN',
    label: 'Admin',
    icon: Shield,
    color: 'bg-purple-500',
  }
};

export default function SignupCard({ isFlipped, setIsFlipped }) {
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
        role: USER_ROLES.PATIENT.value,
        specialization: '',
        licenseNumber: '',
        department: '',
        termsAccepted: false,
    });

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
            case 'licenseNumber':
                if (formData.role === 'DOCTOR' && !value) {
                    fieldErrors.licenseNumber = 'Medical license number is required for doctors';
                } else {
                    delete fieldErrors.licenseNumber;
                }
                break;
            case 'specialization':
                if (formData.role === 'DOCTOR' && !value) {
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

        let requiredFields = ['email', 'password', 'confirmPassword', 'fullName', 'phoneNumber', 'termsAccepted'];
        if (formData.role === USER_ROLES.DOCTOR) {
            requiredFields.push('specialization', 'licenseNumber');
        }
        if (formData.role === USER_ROLES.ADMIN) {
            requiredFields.push('department');
        }

        const newErrors = {};

        requiredFields.forEach((field) => {
            const value = formData[field];
            switch (field) {
                case 'email':
                    if (!value) newErrors.email = 'Email is required';
                    else if (!validateEmail(value)) newErrors.email = 'Please enter a valid email address';
                    break;
                case 'password':
                    if (!value) newErrors.password = 'Password is required';
                    else if (!validatePassword(value))
                        newErrors.password =
                            'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
                    break;
                case 'confirmPassword':
                    if (!value) newErrors.confirmPassword = 'Please confirm your password';
                    else if (value !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
                    break;
                case 'fullName':
                    if (!value) newErrors.fullName = 'Full name is required';
                    else if (value.length < 2) newErrors.fullName = 'Name must be at least 2 characters';
                    break;
                case 'phoneNumber':
                    if (!value) newErrors.phoneNumber = 'Phone number is required';
                    else if (!validatePhoneNumber(value)) newErrors.phoneNumber = 'Please enter a valid phone number';
                    break;
                case 'specialization':
                    if (formData.role === USER_ROLES.DOCTOR && !value) newErrors.specialization = 'Specialization is required for doctors';
                    break;
                case 'licenseNumber':
                    if (formData.role === USER_ROLES.DOCTOR && !value) newErrors.licenseNumber = 'Medical license number is required for doctors';
                    break;
                case 'department':
                    if (formData.role === USER_ROLES.ADMIN && !value) newErrors.department = 'Department is required for admins';
                    break;
                case 'termsAccepted':
                    if (!value) newErrors.termsAccepted = 'You must accept the terms and conditions';
                    break;
                default:
                    break;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setIsLoading(true);
        try {
            await apiClient.post('/account/signup', {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                specialization: formData.specialization,
                licenseNumber: formData.licenseNumber,
                department: formData.department,
                termsAccepted: formData.termsAccepted,
            });
            alert('Account created successfully! Please login.');
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                fullName: '',
                phoneNumber: '',
                role: USER_ROLES.PATIENT.value,
                specialization: '',
                licenseNumber: '',
                department: '',
                termsAccepted: false,
            });
            navigate('/login');
        } catch (err) {
            if (err.isBackendDown) {
                setErrors({ submit: err.message });
            } else {
                const errMsg =
                    (err.response &&
                        err.response.data &&
                        (err.response.data.message || err.response.data.error)) ||
                    err.message ||
                    '';

                if (errMsg.toLowerCase().includes('email already in use')) {
                    setErrors({
                        submit: 'This email is already registered. Please login or use another email.',
                    });
                } else {
                    setErrors({ submit: errMsg || 'Signup failed. Please try again.' });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        validateField('email', formData.email);
        validateField('password', formData.password);
        if (formData.confirmPassword) {
            validateField('confirmPassword', formData.confirmPassword);
        }
    }, [formData.email, formData.password, formData.confirmPassword]);


    const cardVariants = {
        front: { rotateY: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
        back: { rotateY: 180, transition: { duration: 0.6, ease: 'easeInOut' }, position: 'absolute', top: 0, left: 0, width: '100%', backfaceVisibility: 'hidden', height: '100%' },
        hiddenFront: { rotateY: -180, transition: { duration: 0.6, ease: 'easeInOut' }, position: 'absolute', top: 0, left: 0, width: '100%', backfaceVisibility: 'hidden', height: '100%' },
        hiddenBack: { rotateY: 0, transition: { duration: 0.6, ease: 'easeInOut' }, position: 'relative', backfaceVisibility: 'hidden', height: '100%' },
    };

    return (
        <div className="w-[600px] flex items-center justify-center py-8 px-8 relative z-20" style={{ perspective: 1200 }}>
            <button
                type="button"
                aria-label={isFlipped ? "Back to Signup" : "Swap"}
                onClick={() => setIsFlipped(f => !f)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-primary-800/30 text-gray-500 font-bold text-lg shadow-lg flex items-center justify-center"
                style={{ zIndex: 50 }}
            >
                or
            </button>

            <div className="w-full relative" style={{ minHeight: 420 }}>
                {/* Front: full original signup card FORM */}
                <motion.div
                    className="bg-white rounded-3xl shadow-2xl p-8 max-h-[calc(100vh-64px)] overflow-y-auto w-full"
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                    animate={isFlipped ? "hiddenFront" : "front"}
                    variants={cardVariants}
                >
                    {/* Form Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-extrabold text-primary-400 mb-2 mt-0">Join HopeMeds</h2>
                        <h3 className="text-xl font-medium text-gray-600 mb-4">Help reduce medicine <span className='text-[#FACC15]'>waste</span></h3>
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
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 relative z-10 ${formData.role === role.value ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
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

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.fullName && touched.fullName ? 'border-red-300' : 'border-gray-200'
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
                                    className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.email && touched.email ? 'border-red-300' : 'border-gray-200'
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
                                className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.phoneNumber && touched.phoneNumber ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                            )}
                        </div>

                        {/* Additional Doctor fields if role selected */}
                        {formData.role === 'DOCTOR' && (
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialization *</label>
                                    <select
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.specialization && touched.specialization ? 'border-red-300' : 'border-gray-200'
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
                                        className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.licenseNumber && touched.licenseNumber ? 'border-red-300' : 'border-gray-200'
                                            }`}
                                        placeholder="Enter your medical license number"
                                    />
                                    {errors.licenseNumber && touched.licenseNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Additional Admin fields if role selected */}
                        {formData.role === 'ADMIN' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white text-gray-700  border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
                                    className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12 ${errors.password && touched.password ? 'border-red-300' : 'border-gray-200'
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
                                    className={`w-full px-4 py-3 bg-white text-gray-700  border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-300' : 'border-gray-200'
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
                </motion.div>
                <motion.div
                    className="bg-white rounded-xl shadow-xl p-8 absolute top-0 left-0 w-full max-h-[calc(100vh-64px)] overflow-auto"
                    style={{ transformStyle: "preserve-3d", rotateY: "180deg", backfaceVisibility: "hidden", height: "100%" }}
                    animate={isFlipped ? "hiddenBack" : "back"}
                    variants={cardVariants}
                >
                    <h2 className="text-3xl font-extrabold text-primary-400 mb-6 text-center">Sign up with</h2>
                    <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'http://localhost:8080/oauth2/authorization/google';
                            }}
                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-3 cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => alert('Microsoft signup flow to be implemented')}
                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-3 cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                                <rect width="11" height="11" fill="#F25022" />
                                <rect x="13" width="11" height="11" fill="#7FBA00" />
                                <rect y="13" width="11" height="11" fill="#00A4EF" />
                                <rect x="13" y="13" width="11" height="11" fill="#FCAF00" />
                            </svg>
                            <span>Microsoft</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => alert('Facebook signup flow to be implemented')}
                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-3 cursor-pointer"
                        >
                            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                                <path d="M22.675 0h-21.35C.597 0 0 .593 0 1.325v21.351C0 23.405.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.798.143v3.244l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.592l-.468 3.622h-3.124V24h6.128C23.405 24 24 23.405 24 22.676V1.325C24 .593 23.405 0 22.675 0z" />
                            </svg>
                            <span>Facebook</span>
                        </button>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setIsFlipped(false)}
                            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700"
                        >
                            Back to Signup
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}