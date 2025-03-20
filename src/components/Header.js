import React, { useState, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import DropdownMenu from './DropdownMenu';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      <h1 className="text-xl sm:text-2xl font-bold">FPLPESA</h1>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars className="text-xl sm:text-2xl" />
      </button>
      <DropdownMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}

export default Header;