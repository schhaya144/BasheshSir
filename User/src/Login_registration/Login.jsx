import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { FaEnvelope, FaLock } from 'react-icons/fa';
import Context from './Context';
import SummaryApi from '../common/SummaryApi.jsx';
import logo from '../../public/TMIlogo.png';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(SummaryApi.Login.url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Server Response:', result);

      if (result.success) {
        localStorage.setItem('showAppInfoModal', 'true');
        navigate('/kyc');
        fetchUserDetails();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#39237D] to-[#6A4AA1]">
      <div className="flex flex-wrap md:flex-nowrap max-w-3xl w-full gap-8">
        
        {/* Left Section with Logo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-white p-10">
          <img src={logo} alt="Logo" className="rounded-full shadow-lg w-24 h-24 mb-4" />
          <p className="text-lg text-center">
            Welcome to <span className="font-bold">39 Solutions!</span> We offer the best-in-class solutions.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl text-white font-semibold mb-6 text-center">Login to 39 Solutions</h2>
          
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Input */}
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaEnvelope className="text-white mx-2" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border rounded-lg p-2 bg-white/20 shadow-md">
              <FaLock className="text-white mx-2" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white border-none focus:ring-0 outline-none"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-white text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-teal-300 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>

          {/* Signup Navigation */}
          <p className="text-white text-sm text-center mt-4">
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="text-teal-300 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
