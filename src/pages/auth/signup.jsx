// SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Home, Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    age: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setFormData({ name: '', phone: '', address: '', age: '', email: '', password: '' });

        
        toast.success(
          <div className='text-[#0A174E]'>
            Signup successful!
          </div>,
          { autoClose: 3000 }
        );

        // Auto redirect after 3s
        setTimeout(() => navigate('/login'), 3000);

      } else {
        toast.error(data.message || 'Failed to create account', { autoClose: 5000 });
      }
    } catch (err) {
      toast.error('Server error: ' + err.message, { autoClose: 5000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-md shadow-md border border-blue-400">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create a new account below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name & Phone */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address & Age */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-md pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                id="age"
                type="number"
                min="0"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-12 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-12 pr-12 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="w-full primary-btn py-2 rounded-md text-sm">Sign Up</button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an Account?
          <a href="/login" className="text-[#0A174E] hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
