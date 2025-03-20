import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { AiFillHome, AiFillTrophy, AiOutlineUser } from 'react-icons/ai';
import { UserProvider, UserContext } from './context/UserContext';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

function AppContent() {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/stats" element={user ? <Stats /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.isAdmin ? <Admin /> : <Navigate to="/" />} />
      </Routes>

      {user && (
        <nav className="bg-white border-t border-gray-200 p-4 flex justify-around items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 flex flex-col items-center' : 'text-gray-600 flex flex-col items-center'
            }
          >
            <AiFillHome className="text-xl sm:text-2xl" />
            <p className="text-xs sm:text-sm">Home</p>
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 flex flex-col items-center' : 'text-gray-600 flex flex-col items-center'
            }
          >
            <AiFillTrophy className="text-xl sm:text-2xl" />
            <p className="text-xs sm:text-sm">Stats</p>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 flex flex-col items-center' : 'text-gray-600 flex flex-col items-center'
            }
          >
            <AiOutlineUser className="text-xl sm:text-2xl" />
            <p className="text-xs sm:text-sm">Profile</p>
          </NavLink>
        </nav>
      )}
    </div>
  );
}

export default App;