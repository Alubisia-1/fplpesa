import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';

function Home() {
  const { user, selectedLeague, setSelectedLeague, gameweekData } = useContext(UserContext);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Please log in to continue</h2>
      </div>
    );
  }

  const handleLeagueSelect = (league) => {
    setSelectedLeague(league);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Gameweek {gameweekData.gameweek}</h2>
          <p className="text-sm sm:text-base text-gray-600">Deadline: {gameweekData.deadline}</p>
          <p className="text-sm sm:text-base text-gray-600">Time remaining: {gameweekData.timeRemaining}</p>
          <button
            onClick={() => alert('Payment functionality will be added once backend is ready.')}
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm sm:text-base"
          >
            PAY NOW
          </button>
        </section>

        <section className="mb-4">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">SELECT LEAGUE</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {['Madaraka', 'Taifa', 'Umoja', 'Jamhuri'].map((league) => (
              <button
                key={league}
                onClick={() => handleLeagueSelect(league)}
                className={`py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  selectedLeague === league
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {league.toUpperCase()}
              </button>
            ))}
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
              <p className="text-sm sm:text-base text-gray-600">in {selectedLeague}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{gameweekData.standings.points}</p>
              <p className="text-sm sm:text-base text-gray-600">pts</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">PRIZE POOL</h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm sm:text-base text-gray-600">Total</p>
            <p className="text-lg sm:text-xl font-bold text-blue-600">KSH {gameweekData.prizePool.total.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm sm:text-base text-gray-600">1st place (50%):</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {gameweekData.prizePool.first.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm sm:text-base text-gray-600">2nd place (35%):</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {gameweekData.prizePool.second.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm sm:text-base text-gray-600">3rd place (15%):</p>
            <p className="text-sm sm:text-base font-semibold text-gray-800">KSH {gameweekData.prizePool.third.toLocaleString()}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;