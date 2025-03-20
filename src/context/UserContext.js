import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('Madaraka');
  const [joinedLeague, setJoinedLeague] = useState(null);
  const [gameweekData, setGameweekData] = useState({
    gameweek: 29,
    deadline: 'Saturday, 11:00 EAT',
    timeRemaining: '18 hours',
    standings: { position: 12, rank: '12th of 56', points: 69 },
    prizePool: { total: 56000, first: 28000, second: 19600, third: 8400 },
  });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [fplData, setFplData] = useState(null);

  useEffect(() => {
    // Mock user data after FPL authentication
    setUser({
      id: 1,
      fplId: '12345', // FPL ID from authentication
      name: 'John Doe', // Fetched from FPL API (e.g., entry name)
      email: 'john.doe@example.com', // Fetched or set during signup
      paid: true,
      isAdmin: false,
    });

    // Mock FPL data (fetched after authentication)
    setFplData({
      teamName: 'The Mighty Reds',
      overallPoints: 1450,
      overallRank: 25000,
      teamValue: 101.5,
      squad: [
        { name: 'Alisson', position: 'GKP', points: 120 },
        { name: 'Trent Alexander-Arnold', position: 'DEF', points: 150 },
        { name: 'Virgil van Dijk', position: 'DEF', points: 130 },
        { name: 'Andrew Robertson', position: 'DEF', points: 125 },
        { name: 'Mohamed Salah', position: 'MID', points: 250 },
        { name: 'Kevin De Bruyne', position: 'MID', points: 200 },
        { name: 'Bruno Fernandes', position: 'MID', points: 180 },
        { name: 'Son Heung-min', position: 'MID', points: 170 },
        { name: 'Erling Haaland', position: 'FWD', points: 220 },
        { name: 'Harry Kane', position: 'FWD', points: 190 },
        { name: 'Ollie Watkins', position: 'FWD', points: 160 },
        { name: 'Emiliano Martínez', position: 'GKP', points: 110, isBench: true },
        { name: 'João Cancelo', position: 'DEF', points: 100, isBench: true },
        { name: 'James Maddison', position: 'MID', points: 90, isBench: true },
        { name: 'Dominic Calvert-Lewin', position: 'FWD', points: 80, isBench: true },
      ],
    });

    // Mock payment history
    setPaymentHistory([
      { id: 1, league: 'Madaraka', amount: 1000, date: '2025-03-15', status: 'Completed' },
      { id: 2, league: 'Taifa', amount: 500, date: '2025-03-10', status: 'Completed' },
      { id: 3, league: 'Umoja', amount: 200, date: '2025-03-05', status: 'Failed' },
    ]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedLeague,
        setSelectedLeague,
        joinedLeague,
        setJoinedLeague,
        gameweekData,
        setGameweekData,
        paymentHistory,
        setPaymentHistory,
        fplData,
        setFplData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};