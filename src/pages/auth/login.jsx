import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Apps/Reducers/UserSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON response:", text);
        setError("Server returned invalid response");
        return;
      }

      if (res.ok) {
        localStorage.setItem('token', data.token);
        const userObj = { email: data.user.email, role: data.user.role, name: data.user.name };
        dispatch(setUser(userObj));
        localStorage.setItem('user', JSON.stringify(userObj));

        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "seller") {
          navigate("/seller");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || 'Invalid user credentials');
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-md shadow-md border border-blue-400">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Please login using your account details below.</p>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Inline error */}
          {error && <div className="mb-4 text-center text-sm text-red-600 font-medium">{error}</div>}

          {/* Login Button */}
          <button type="submit" className="w-full primary-btn py-3 rounded-md pl-10 pr-10">Login</button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an Account?
          <a href="/signup" className="text-[#0A174E] hover:underline ml-1">Create account</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
