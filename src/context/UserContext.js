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
  const [invites, setInvites] = useState([]); // Add invites state

  useEffect(() => {
    // Mock user data (admin user)
    setUser({
      id: 1,
      fplId: '12345',
      name: 'John Doe',
      email: 'john.doe@example.com',
      paid: true,
      isAdmin: true, // Set to true for admin user
    });

    // Mock FPL data
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

    // Mock payment history (with user details for admin)
    setPaymentHistory([
      { id: 1, userId: 2, userName: 'Jane Smith', league: 'Madaraka', amount: 1000, date: '2025-03-15', status: 'Pending', transactionId: 'TXN123' },
      { id: 2, userId: 3, userName: 'Mike Johnson', league: 'Taifa', amount: 500, date: '2025-03-10', status: 'Completed', transactionId: 'TXN124' },
      { id: 3, userId: 4, userName: 'Sarah Brown', league: 'Umoja', amount: 200, date: '2025-03-05', status: 'Failed', transactionId: 'TXN125' },
    ]);

    // Mock invites
    setInvites([
      { id: 1, league: 'Madaraka', code: 'MAD2025', email: 'jane.smith@example.com', status: 'Pending', createdAt: '2025-03-15' },
      { id: 2, league: 'Taifa', code: 'TAI2025', email: 'mike.johnson@example.com', status: 'Accepted', createdAt: '2025-03-10' },
      { id: 3, league: 'Umoja', code: 'UMO2025', email: 'sarah.brown@example.com', status: 'Expired', createdAt: '2025-03-05' },
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
        invites,
        setInvites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};