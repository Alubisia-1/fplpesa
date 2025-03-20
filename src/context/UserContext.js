import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('Madaraka');
  const [gameweekData, setGameweekData] = useState({
    gameweek: 29,
    deadline: 'Saturday, 11:00 EAT',
    timeRemaining: '18 hours',
    standings: { position: 12, rank: '12th of 56', points: 69 },
    prizePool: { total: 56000, first: 28000, second: 19600, third: 8400 },
  });

  useEffect(() => {
    // Mock user data (simulating a logged-in user for testing)
    // You can toggle this to null to simulate a logged-out state
    setUser({ id: 1, name: 'John Doe', fplId: '12345', paid: true, isAdmin: false });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedLeague,
        setSelectedLeague,
        gameweekData,
        setGameweekData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};