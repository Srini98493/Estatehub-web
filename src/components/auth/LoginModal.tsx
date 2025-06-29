import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { SocialLogin } from './SocialLogin';
import { API_ENDPOINTS } from '../../config/api';
import { toast, Toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginError {
  code: number;
  message: string;
}

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  areaCode: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dob: string;
  location: string;
  city: string;
  state: string;
  country: string;
}

interface FormErrors {
  email: string;
  password: string;
  server: string;
  fullName?: string;
  phone?: string;
  confirmPassword?: string;
  gender?: string;
  dob?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  areaCode?: string;
}

interface RegistrationPayload {
  name: string;
  username: string;
  password: string;
  areaCode: string;
  contactNo: string;
  email: string;
  socialEmail: string | null;
  gender: string | null;
  dob: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  profileImagePath: string;
  isNotificationEnabled: boolean;
  userType: number;
  createdBy: number;
}

const ErrorMessage: React.FC<{ message: string; className?: string }> = ({ message, className = "" }) => {
  return (
  <div className={`bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg ${className}`}>
    {message}
  </div>
)
}

export const LoginModal = () => {
  const { showLoginModal, toggleLoginModal, login: storeLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    server: '',
  });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    areaCode: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    location: '',
    city: '',
    state: '',
    country: '',
  });
  const [errorPosition, setErrorPosition] = useState<'top' | 'bottom'>('top');
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstPersonalInputRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationStep === 2) {
      if (modalRef.current) {
        modalRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => {
        firstPersonalInputRef.current?.focus();
      }, 100);
    }
  }, [registrationStep]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const element = e.target as HTMLDivElement;
      const scrollPosition = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      
      setErrorPosition(scrollPosition / (scrollHeight - clientHeight) > 0.3 ? 'bottom' : 'top');
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  const resetAllStates = () => {
    setIsLogin(true);
    setRegistrationStep(1);
    setShowPassword(false);
    setShowOtpVerification(false);
    setFormData({
      email: '',
      password: '',
    });
    setErrors({
      email: '',
      password: '',
      server: '',
    });
    setRegisterData({
      fullName: '',
      email: '',
      phone: '',
      areaCode: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dob: '',
      location: '',
      city: '',
      state: '',
      country: '',
    });
    setOtp(['', '', '', '', '', '']);
  };

  const handleCloseModal = () => {
    resetAllStates();
    toggleLoginModal(false);
  };

  if (!showLoginModal) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', server: '' };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(prev => ({
          ...prev,
          server: data.message || 'Login failed',
        }));
        return;
      }

      const userData = {
        userid: data.user.userid,
        fullname: data.user.fullname,
        username: data.user.username,
        useremail: data.user.useremail,
        profileimagepath: data.user.profileimagepath,
        isadmin: data.user.isadmin,
        usertype: data.user.usertype,
        // Add any other relevant user data you need
      };

      const tokens = {
        access: {
          token: data.tokens.access.token,
          expires: data.tokens.access.expires,
        },
        refresh: {
          token: data.tokens.refresh.token,
          expires: data.tokens.refresh.expires,
        },
      };

      // Store tokens
      localStorage.setItem('accessToken', tokens.access.token);
      localStorage.setItem('refreshToken', tokens.refresh.token);
      localStorage.setItem('tokenExpiry', tokens.access.expires.toString());
      localStorage.setItem('userData', JSON.stringify(userData));

      // Update auth store
      storeLogin({ user: data.user, tokens });
      
      toast.success('Successfully logged in!');
      navigate('/');
      handleCloseModal();
    } catch (error) {
      toast.error('An error occurred during login');
      setErrors(prev => ({
        ...prev,
        server: 'An error occurred. Please try again.',
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '', server: '' }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', server: '' }));
  };

  const validateBasicInfo = () => {
    const newErrors: FormErrors = {
      email: '',
      password: '',
      server: ''
    };
    let isValid = true;

    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!registerData.areaCode.trim()) {
      newErrors.areaCode = 'Country code is required';
      isValid = false;
    }
    // else if (!/^\+?[1-9]\d{1,14}$/.test(registerData.areaCode)) {
    //   newErrors.areaCode = "Invalid country code (should start with + and accept only numbers)";
    //   isValid = false;
    // }

    if (!registerData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
      //Phone number just accept numbers
    } else if (!/^\d{1,14}$/.test(registerData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    if (!registerData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBasicInfo()) {
      setRegistrationStep(2);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpValue = otp.join('');
      const response = await fetch(`${API_ENDPOINTS.VERIFY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerData.email,
          otp: otpValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Email verified successfully!');
        handleCloseModal(); // Close modal and reset state after successful verification
      } else {
        toast.error(data.message || 'Failed to verify email');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify email');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare registration payload
      const registrationPayload = {
        // Basic Information (Required)
        name: registerData.fullName,
        username: registerData.email.split('@')[0], // Generate username from email
        password: registerData.password,
        areaCode: registerData.areaCode,
        contactNo: registerData.phone,
        email: registerData.email,
        
        // Personal Information (all optional)
        socialEmail: registerData.email, // Using primary email as social email
        gender: registerData.gender || null,
        dob: registerData.dob || null,
        location: registerData.location || null,
        city: registerData.city || null,
        state: registerData.state || null,
        country: registerData.country || null,
        
        // Default values
        profileImagePath: '/uploads/profile/default.jpg',
        isNotificationEnabled: true,
        userType: 1,
        createdBy: 1
      };

      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpVerification(true); // Show OTP verification after successful registration
        toast.success('Registration successful! Please verify your email.');
      } else {
        toast.error(data.message || 'Registration failed');
        setErrors(prev => ({
          ...prev,
          server: data.message || 'Registration failed',
        }));
        return;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration');
      setErrors(prev => ({
        ...prev,
        server: 'An error occurred during registration. Please try again.',
      }));
    }
  };

  const handleForgotPassword = () => {
    toggleLoginModal(false); // Close the modal
    navigate('/forgot-password'); // Redirect to the Forgot Password page
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    setErrors({ password: '', confirmPassword: '', server: '' }); // Reset errors when switching to register
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
      >
        {!showOtpVerification && (
          <Button
            onClick={handleCloseModal}
            variant="secondary"
            size="sm"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        {showOtpVerification 
          ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">Verify your Email</h2>
              <p className="text-center text-gray-600 mb-8">
                An email with OTP has been sent to your email
              </p>

              <div className="flex justify-center gap-2 mb-8">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifyOtp}
                fullWidth
                size="lg"
              >
                Validate
              </Button>
            </>
          ) 
          : isLogin 
            ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-8">Login into your account</h2>
                {errors.server && errorPosition === 'top' && (
                  <ErrorMessage message={errors.server} className="mb-6" />
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.password ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-black-500 underline hover:text-black-900 text-sm"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                  >
                    Login
                  </Button>

                  {/* <SocialLogin text="Or Login with" /> */}

                  <div className="text-center">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={handleSwitchToRegister}
                        className="text-black-500 underline hover:text-black-900"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </form>
              </>
            ) 
            : (registrationStep === 1 
                ? (
                  <>
                    <h2 className="text-2xl font-bold text-center mb-8">Basic Information</h2>
                    {errors.server && errorPosition === 'top' && (
                      <ErrorMessage message={errors.server} className="mb-6" />
                    )}
                    <form onSubmit={handleProceed} className="space-y-6">
                      <div>
                        <input
                          type="text"
                          name="fullName"
                          value={registerData.fullName}
                          onChange={handleRegisterInputChange}
                          placeholder="Full Name"
                          maxLength={30}
  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterInputChange}
                          placeholder="Email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <input
                            type="text"
                            name="areaCode"
                            value={registerData.areaCode}
                            onChange={handleRegisterInputChange}
                            placeholder="Country Code"
                            maxLength={4}
                            inputMode="numeric"
                            pattern="\d*"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.areaCode && <p className="text-red-500 text-sm mt-1">{errors.areaCode}</p>}
                        </div>
                        <div className="col-span-2">
                          <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={handleRegisterInputChange}
                            placeholder="Phone Number"
                            maxLength={10}
                            inputMode="numeric"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="mb-4 relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterInputChange}
                          placeholder="Password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-500"
                        >
                          {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>

                      <div className="mb-4 relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterInputChange}
                          placeholder="Re-Enter Password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-500"
                        >
                          {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        onClick={handleProceed}
                      >
                        Proceed
                      </Button>

                      {/* <SocialLogin text="Or Signup with" /> */}

                      <div className="text-center mt-6">
                        <Button
                          variant="secondary"
                          fullWidth
                          onClick={handleSwitchToRegister}
                        >
                          Already have an account? Sign in
                        </Button>
                      </div>
                    </form>
                  </>
                ) 
                : (
                  <>
                    <div className="flex items-center mb-8">
                      <Button
                        onClick={() => setRegistrationStep(1)}
                        variant="secondary"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800 p-2 -ml-2"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <h2 className="text-2xl font-bold text-center flex-1 pr-7">Personal Information</h2>
                    </div>
                    {errors.server && errorPosition === 'top' && (
                      <ErrorMessage message={errors.server} className="mb-6" />
                    )}
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div>
                        <select
                          ref={firstPersonalInputRef}
                          name="gender"
                          value={registerData.gender}
                          onChange={handleRegisterInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="date"
                          name="dob"
                          value={registerData.dob}
                          onChange={handleRegisterInputChange}
                          placeholder="DOB"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="location"
                          value={registerData.location}
                          onChange={handleRegisterInputChange}
                          placeholder="Location"
                          maxLength={25}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="city"
                          value={registerData.city}
                          onChange={handleRegisterInputChange}
                          placeholder="City"
                          maxLength={15}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="state"
                          value={registerData.state}
                          onChange={handleRegisterInputChange}
                          placeholder="State"
                          maxLength={20}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          name="country"
                          value={registerData.country}
                          onChange={handleRegisterInputChange}
                          placeholder="Country"
                          maxLength={20}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        onClick={handleRegister}
                      >
                        Signup
                      </Button>

                      <SocialLogin text="Or Signup with" />

                      <div className="text-center mt-6">
                        <Button
                          variant="secondary"
                          fullWidth
                          onClick={() => setIsLogin(true)}
                        >
                          Already have an account? Sign in
                        </Button>
                      </div>
                    </form>
                  </>
                )
              )
        }
      </div>
    </div>
  );
};