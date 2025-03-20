import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [fplId, setFplId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login functionality
    if (fplId && password) {
      setUser({ id: 1, name: 'John Doe', fplId, paid: true, isAdmin: false });
      navigate('/');
    } else {
      setError('Please enter both FPL ID and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Login with FPL Credentials</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">FPL ID</label>
              <input
                type="text"
                value={fplId}
                onChange={(e) => setFplId(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;