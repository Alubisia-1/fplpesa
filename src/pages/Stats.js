import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

function Stats() {
  const { user, joinedLeague, gameweekData } = useContext(UserContext);
  const [chartType, setChartType] = useState('points'); // Toggle between points and rank for the graph
  const [selectedComparison, setSelectedComparison] = useState(''); // For the comparison tool

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Please log in to continue</h2>
      </div>
    );
  }

  if (!joinedLeague) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Please join a league to view stats</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  // Mock user stats
  const userStats = {
    currentRank: '7th of 50 players',
    totalPoints: 450,
    averagePoints: 50.2,
    wins: { first: 1, second: 1, third: 0 },
    totalEarnings: 15750,
    bestGameweek: { gameweek: 3, points: 85, rank: '1st', payout: 9000 },
    longestStreak: 3,
    biggestPayout: 9000,
  };

  // Mock gameweek history
  const gameweekHistory = [
    { gameweek: 5, points: 62, rank: 3, payout: 2700, trend: 'up' },
    { gameweek: 4, points: 55, rank: 5, payout: 0, trend: 'down' },
    { gameweek: 3, points: 85, rank: 1, payout: 9000, trend: 'up' },
    { gameweek: 2, points: 48, rank: 12, payout: 0, trend: 'down' },
    { gameweek: 1, points: 60, rank: 8, payout: 0, trend: 'up' },
  ];

  // Mock league-wide stats
  const leagueStats = {
    highestScore: { points: 92, user: '@UserX' },
    averageScore: 48.5,
    totalPool: 20000,
    biggestWinner: { user: '@UserY', earnings: 25000 },
  };

  // Data for the performance graph (points and rank over gameweeks)
  const chartData = gameweekHistory.map((entry) => ({
    gameweek: entry.gameweek,
    points: entry.points,
    rank: entry.rank,
    payout: entry.payout > 0 ? entry.payout : null, // For highlighting payouts
  }));

  // Mock comparison data
  const comparisonOptions = ['League Average', '@UserX', '@UserY'];
  const comparisonData = {
    'League Average': { totalPoints: 420, wins: { first: 0, second: 0, third: 0 }, totalEarnings: 12000 },
    '@UserX': { totalPoints: 480, wins: { first: 2, second: 1, third: 0 }, totalEarnings: 20000 },
    '@UserY': { totalPoints: 500, wins: { first: 3, second: 0, third: 1 }, totalEarnings: 25000 },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        {/* Navigation and Context */}
        <section className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{joinedLeague} Stats</h1>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <Link to={`/league/${joinedLeague}`} className="text-blue-600 hover:underline text-sm sm:text-base">
              Back to Leaderboard
            </Link>
            <Link to={`/league/${joinedLeague}`} className="text-blue-600 hover:underline text-sm sm:text-base">
              View Prizes
            </Link>
            <p className="text-sm text-gray-600">Next Gameweek: 2d 14h</p>
          </div>
        </section>

        {/* 1. User Performance Overview */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Performance Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{userStats.currentRank}</p>
              <p className="text-sm text-gray-600">Current Rank</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{userStats.totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{userStats.averagePoints}</p>
              <p className="text-sm text-gray-600">Avg Points/GW</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {userStats.wins.first + userStats.wins.second + userStats.wins.third} Wins
              </p>
              <p className="text-sm text-gray-600">
                1st x{userStats.wins.first}, 2nd x{userStats.wins.second}, 3rd x{userStats.wins.third}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">KSH {userStats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
          </div>
        </section>

        {/* 2. Gameweek History */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Gameweek History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Gameweek</th>
                  <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Points</th>
                  <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Rank</th>
                  <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Payout</th>
                  <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Trend</th>
                </tr>
              </thead>
              <tbody>
                {gameweekHistory.map((entry) => (
                  <tr key={entry.gameweek} className="border-b">
                    <td className="p-2 text-sm sm:text-base">Gameweek {entry.gameweek}</td>
                    <td className="p-2 text-sm sm:text-base">{entry.points}</td>
                    <td className="p-2 text-sm sm:text-base">{entry.rank}th</td>
                    <td className="p-2 text-sm sm:text-base">
                      {entry.payout > 0 ? `KSH ${entry.payout.toLocaleString()}` : '-'}
                    </td>
                    <td className="p-2 text-sm sm:text-base">
                      {entry.trend === 'up' ? '↑' : '↓'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. League-Wide Stats */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">League-Wide Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{leagueStats.highestScore.points}</p>
              <p className="text-sm text-gray-600">Highest Score ({leagueStats.highestScore.user})</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{leagueStats.averageScore}</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">KSH {leagueStats.totalPool.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Pool</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">KSH {leagueStats.biggestWinner.earnings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Biggest Winner ({leagueStats.biggestWinner.user})</p>
            </div>
          </div>
        </section>

        {/* 4. Personal Milestones */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Personal Milestones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">Gameweek {userStats.bestGameweek.gameweek}</p>
              <p className="text-sm text-gray-600">
                Best Gameweek: {userStats.bestGameweek.points} pts, {userStats.bestGameweek.rank}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{userStats.longestStreak}</p>
              <p className="text-sm text-gray-600">Longest Top 10 Streak (weeks)</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">KSH {userStats.biggestPayout.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Biggest Payout</p>
            </div>
          </div>
        </section>

        {/* 5. Visual Performance Graph */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Performance Graph</h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setChartType(chartType === 'points' ? 'rank' : 'points')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Toggle to {chartType === 'points' ? 'Rank' : 'Points'}
            </button>
          </div>
          <div className="w-full h-64 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gameweek" label={{ value: 'Gameweek', position: 'insideBottom', offset: -5 }} />
                <YAxis
                  label={{
                    value: chartType === 'points' ? 'Points' : 'Rank',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  reversed={chartType === 'rank'} // Reverse Y-axis for rank (lower rank is better)
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={chartType}
                  stroke="#2563eb"
                  activeDot={{ r: 8 }}
                  name={chartType === 'points' ? 'Points' : 'Rank'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 6. Comparison Tool (Optional) */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Compare Your Stats</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Compare With</label>
            <select
              value={selectedComparison}
              onChange={(e) => setSelectedComparison(e.target.value)}
              className="w-full sm:w-1/4 mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">-- Select --</option>
              {comparisonOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {selectedComparison && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Your Stats</h3>
                <p className="text-sm text-gray-600">Total Points: {userStats.totalPoints}</p>
                <p className="text-sm text-gray-600">
                  Wins: 1st x{userStats.wins.first}, 2nd x{userStats.wins.second}, 3rd x{userStats.wins.third}
                </p>
                <p className="text-sm text-gray-600">Earnings: KSH {userStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">{selectedComparison}</h3>
                <p className="text-sm text-gray-600">Total Points: {comparisonData[selectedComparison].totalPoints}</p>
                <p className="text-sm text-gray-600">
                  Wins: 1st x{comparisonData[selectedComparison].wins.first}, 2nd x
                  {comparisonData[selectedComparison].wins.second}, 3rd x{comparisonData[selectedComparison].wins.third}
                </p>
                <p className="text-sm text-gray-600">
                  Earnings: KSH {comparisonData[selectedComparison].totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Stats;