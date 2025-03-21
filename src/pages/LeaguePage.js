import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify'; // Import toast
import Header from '../components/Header';
import PaymentModal from '../components/PaymentModal';

function LeaguePage() {
  const { leagueName } = useParams();
  const { user, joinedLeague, setJoinedLeague, setSelectedLeague, gameweekData } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false); // State for confirmation modal

  const leagueData = {
    Madaraka: {
      buyIn: '1000 KSH per gameweek',
      tagline: 'High stakes, big rewards!',
      leaderboard: [
        { rank: 1, name: 'Alice', points: 85 },
        { rank: 2, name: 'Bob', points: 78 },
        { rank: 3, name: 'Charlie', points: 72 },
        { rank: 4, name: 'David', points: 65 },
        { rank: 5, name: 'Eve', points: 60 },
      ],
      prizePool: { total: 56000, first: 28000, second: 19600, third: 8400 },
    },
    Taifa: {
      buyIn: '500 KSH per gameweek',
      tagline: 'Balanced competition, solid rewards!',
      leaderboard: [
        { rank: 1, name: 'Frank', points: 80 },
        { rank: 2, name: 'Grace', points: 75 },
        { rank: 3, name: 'Henry', points: 70 },
        { rank: 4, name: 'Isabel', points: 62 },
        { rank: 5, name: 'Jack', points: 58 },
      ],
      prizePool: { total: 28000, first: 14000, second: 9800, third: 4200 },
    },
    Umoja: {
      buyIn: '200 KSH per gameweek',
      tagline: 'Affordable fun, great prizes!',
      leaderboard: [
        { rank: 1, name: 'Kelly', points: 78 },
        { rank: 2, name: 'Liam', points: 73 },
        { rank: 3, name: 'Mia', points: 68 },
        { rank: 4, name: 'Noah', points: 60 },
        { rank: 5, name: 'Olivia', points: 55 },
      ],
      prizePool: { total: 11200, first: 5600, second: 3920, third: 1680 },
    },
    Jamhuri: {
      buyIn: '100 KSH per gameweek',
      tagline: 'Low entry, high excitement!',
      leaderboard: [
        { rank: 1, name: 'Peter', points: 75 },
        { rank: 2, name: 'Quinn', points: 70 },
        { rank: 3, name: 'Rachel', points: 65 },
        { rank: 4, name: 'Sam', points: 58 },
        { rank: 5, name: 'Tina', points: 53 },
      ],
      prizePool: { total: 5600, first: 2800, second: 1960, third: 840 },
    },
  };

  const currentLeague = leagueData[leagueName];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Please log in to continue</h2>
      </div>
    );
  }

  if (!currentLeague) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">League not found</h2>
      </div>
    );
  }

  const handleJoinLeague = () => {
    if (joinedLeague && joinedLeague !== leagueName) {
      toast.error('You are already in a league. Leave your current league to join a new one.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setJoinedLeague(leagueName);
    setSelectedLeague(leagueName);
  };

  const handleLeaveLeague = () => {
    setShowLeaveConfirm(true); // Show confirmation modal
  };

  const confirmLeaveLeague = () => {
    setJoinedLeague(null);
    setShowLeaveConfirm(false);
    toast.success(`You have left the ${leagueName} league.`, {
      position: 'top-right',
      autoClose: 3000,
    });
    navigate('/'); // Navigate back to the home page after leaving
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        {joinedLeague !== leagueName ? (
          // Pre-Selection View
          <section className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{leagueName}</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-2">{currentLeague.buyIn}</p>
            <p className="text-md sm:text-lg text-gray-500 mb-4">{currentLeague.tagline}</p>
            <button
              onClick={handleJoinLeague}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
            >
              Join Now
            </button>
          </section>
        ) : (
          // Post-Selection View
          <>
            <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{leagueName} Leaderboard</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Rank</th>
                      <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Name</th>
                      <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeague.leaderboard.map((entry) => (
                      <tr key={entry.rank} className="border-b">
                        <td className="p-2 text-sm sm:text-base">{entry.rank}</td>
                        <td className="p-2 text-sm sm:text-base">{entry.name}</td>
                        <td className="p-2 text-sm sm:text-base">{entry.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">YOUR CURRENT STANDING</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-blue-600">{gameweekData.standings.position}</p>
                  <p className="text-sm sm:text-base text-gray-600">Position</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-blue-600">{gameweekData.standings.rank}</p>
                  <p className="text-sm sm:text-base text-gray-600">in {leagueName}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-blue-600">{gameweekData.standings.points}</p>
                  <p className="text-sm sm:text-base text-gray-600">pts</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">PRIZE POOL</h3>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm sm:text-base text-gray-600">Total</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">KSH {currentLeague.prizePool.total.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm sm:text-base text-gray-600">1st place (50%):</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {currentLeague.prizePool.first.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm sm:text-base text-gray-600">2nd place (35%):</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {currentLeague.prizePool.second.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm sm:text-base text-gray-600">3rd place (15%):</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {currentLeague.prizePool.third.toLocaleString()}</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-4 sm:p-6">
              <button
                onClick={handleLeaveLeague}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 text-sm sm:text-base"
              >
                Leave League
              </button>
            </section>

            {/* Confirmation Modal for Leaving League */}
            {showLeaveConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Leave League</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to leave the {leagueName} league?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLeaveConfirm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmLeaveLeague}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        league={leagueName}
        buyIn={currentLeague.buyIn}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default LeaguePage;