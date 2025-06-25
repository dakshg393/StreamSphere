import React, { useState } from 'react';
import axios from 'axios';
import useUserStore from '../../Store/user.Store';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const setUser = useUserStore((state) => state.setUser); 
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}users/login`,
        formData,
        { withCredentials: true } 
      );

      alert('Login successful',response.data.data.user);
      
      setUser(response.data.data.user)
      navigate("/")
    } catch (error) {
      alert('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Not have an account? <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
        </p>
        <p className='text-red-600'> This project uses a free-tier cloud backend service (like Render or Railway).  
    On the first API call, the server may take <strong>5–15 seconds</strong> to wake up.  
    During this time, you may see a short delay or a timeout error.  
    Please wait a few seconds and try again — the server will respond once it's active.</p>

      </div>
    </div>
  );
};

export default LoginPage;
