import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Header from '../components/Header';

function Profile() {
  const {
    user,
    setUser,
    joinedLeague,
    setJoinedLeague,
    setSelectedLeague,
    fplData,
    paymentHistory,
    gameweekData,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false); // Add state for confirmation modal

  if (!user || !fplData) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Please log in to continue</h2>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    setJoinedLeague(null);
    setSelectedLeague('Madaraka');
    navigate('/login');
    toast.info('You have been logged out.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleLeaveLeague = () => {
    setShowLeaveConfirm(true); // Show confirmation modal
  };

  const confirmLeaveLeague = () => {
    setJoinedLeague(null);
    setSelectedLeague('Madaraka');
    setShowLeaveConfirm(false);
    toast.success(`You have left the ${joinedLeague} league.`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name, email });
    setIsEditing(false);
    toast.success('Profile updated successfully.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        {/* Navigation and Context */}
        <section className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Profile</h1>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <Link to="/" className="text-blue-600 hover:underline text-sm sm:text-base">
              Back to Home
            </Link>
            <Link to="/stats" className="text-blue-600 hover:underline text-sm sm:text-base">
              View Stats
            </Link>
          </div>
        </section>

        {/* 1. Account Details */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-sm text-gray-600">Name: {user.name}</p>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-gray-600">FPL Team: {fplData.teamName}</p>
              <p className="text-sm text-gray-600">FPL ID: {user.fplId}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              >
                Edit Profile
              </button>
            </div>
          )}
        </section>

        {/* 2. FPL Stats */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">FPL Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{fplData.overallPoints}</p>
              <p className="text-sm text-gray-600">Overall Points</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{fplData.overallRank.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Overall Rank</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">£{fplData.teamValue}m</p>
              <p className="text-sm text-gray-600">Team Value</p>
            </div>
          </div>
        </section>

        {/* 3. Current FPL Squad */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Current FPL Squad</h2>
          <div className="mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Starting XI</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fplData.squad
                .filter((player) => !player.isBench)
                .map((player, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-sm text-gray-800">
                      {player.name} ({player.position})
                    </span>
                    <span className="text-sm text-blue-600">{player.points} pts</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">Bench</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fplData.squad
                .filter((player) => player.isBench)
                .map((player, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                    <span className="text-sm text-gray-800">
                      {player.name} ({player.position})
                    </span>
                    <span className="text-sm text-blue-600">{player.points} pts</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* 4. FPL Gameweek Performance */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">FPL Gameweek Performance</h2>
          <p className="text-sm text-gray-600">Current Gameweek Points: 55</p>
          <Link to="/stats" className="text-blue-600 hover:underline text-sm">
            View Full History
          </Link>
        </section>

        {/* 5. FPLPESA League Info */}
        {joinedLeague && (
          <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">FPLPESA League</h2>
            <p className="text-sm text-gray-600">Current League: {joinedLeague}</p>
            <p className="text-sm text-gray-600">Position: {gameweekData.standings.position}</p>
            <p className="text-sm text-gray-600">Rank: {gameweekData.standings.rank}</p>
            <p className="text-sm text-gray-600">Points: {gameweekData.standings.points} pts</p>
            <button
              onClick={handleLeaveLeague}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
            >
              Leave League
            </button>
          </section>
        )}

        {/* Confirmation Modal for Leaving League */}
        {showLeaveConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Leave League</h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to leave the {joinedLeague} league?
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

        {/* 6. Payment History */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Date</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">League</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Amount</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-2 text-sm sm:text-base">{payment.date}</td>
                      <td className="p-2 text-sm sm:text-base">{payment.league}</td>
                      <td className="p-2 text-sm sm:text-base">KSH {payment.amount.toLocaleString()}</td>
                      <td className="p-2 text-sm sm:text-base">
                        <span
                          className={
                            payment.status === 'Completed' ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No payment history available.</p>
          )}
        </section>

        {/* 7. Logout */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
          >
            Log Out
          </button>
        </section>
      </main>
    </div>
  );
}

export default Profile;