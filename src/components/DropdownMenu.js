import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DropdownMenu({ isOpen, onClose, user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg w-48 z-50">
      <div className="flex flex-col">
        {user ? (
          <>
            <Link
              to="/profile"
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
              onClick={onClose}
            >
              Profile
            </Link>
            <Link
              to="/stats"
              className="px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={onClose}
            >
              Stats
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-800 hover:bg-gray-100 text-left rounded-b-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            Login
          </Link>
        )}
        {/* Add more menu items here as needed */}
        {/* Example: 
        <Link
          to="/settings"
          className="px-4 py-2 text-gray-800 hover:bg-gray-100"
          onClick={onClose}
        >
          Settings
        </Link>
        */}
      </div>
    </div>
  );
}

export default DropdownMenu;