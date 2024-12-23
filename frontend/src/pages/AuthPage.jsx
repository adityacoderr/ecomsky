import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setLoading(true); // Set loading to true

    if (!phoneNumber || !password) {
      setError('Phone number and password are required.');
      setLoading(false);
      return;
    }

    try {
      const url = isSignup
        ? 'http://localhost:5000/api/auth/signup'
        : 'http://localhost:5000/api/auth/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the user data (token, userId) in localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        localStorage.setItem('phoneNumber', phoneNumber);

        // Redirect to homepage upon success
        navigate('/home');
      } else {
        // Handle errors from the backend
        setError(data.message || 'An error occurred during login/signup');
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isSignup ? 'Sign Up' : 'Log In'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsSignup((prev) => !prev)}
            className="text-sm text-white hover:underline"
          >
            {isSignup
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
