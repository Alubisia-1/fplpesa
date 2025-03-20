import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Import UserContext

function PaymentModal({ isOpen, onClose, league, buyIn, onPaymentSuccess, showLeagueSelection = false }) {
  const { joinedLeague } = useContext(UserContext); // Access joinedLeague from context
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedLeague, setSelectedLeague] = useState(league || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const leagueData = {
    Madaraka: { buyIn: '1000 KSH per gameweek' },
    Taifa: { buyIn: '500 KSH per gameweek' },
    Umoja: { buyIn: '200 KSH per gameweek' },
    Jamhuri: { buyIn: '100 KSH per gameweek' },
  };

  const currentBuyIn = showLeagueSelection ? (selectedLeague ? leagueData[selectedLeague].buyIn : '') : buyIn;

  useEffect(() => {
    if (isOpen && showLeagueSelection) {
      setSelectedLeague('');
      setShowConfirmation(false);
      setPhoneNumber('');
      setError('');
    }
  }, [isOpen, showLeagueSelection]);

  const handleConfirm = (e) => {
    e.preventDefault();
    setError('');

    // Check if user is already in a league
    const targetLeague = showLeagueSelection ? selectedLeague : league;
    if (joinedLeague && joinedLeague !== targetLeague) {
      setError('You are already in a league. Leave your current league to join a new one.');
      return;
    }

    // Validate league selection if on Home page
    if (showLeagueSelection && !selectedLeague) {
      setError('Please select a league to join.');
      return;
    }

    // Validate phone number
    const phoneRegex = /^254\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid MPESA phone number (e.g., 254712345678)');
      return;
    }

    setShowConfirmation(true);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Payment successful! Please check your phone for the MPESA confirmation.');
      onPaymentSuccess(showLeagueSelection ? selectedLeague : league);
      setShowConfirmation(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {!showConfirmation ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {showLeagueSelection ? 'Join a League' : `Join ${league} League`}
            </h2>
            {showLeagueSelection && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select League</label>
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">-- Select a League --</option>
                  {Object.keys(leagueData).map((leagueOption) => (
                    <option key={leagueOption} value={leagueOption}>
                      {leagueOption}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <p className="text-sm text-gray-600 mb-4">
              Buy-in Amount: {currentBuyIn || 'Select a league to see the buy-in amount'}
            </p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleConfirm}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number (MPESA)</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., 254712345678"
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Payment</h2>
            <p className="text-sm text-gray-600 mb-4">
              You are about to pay {currentBuyIn} to join the {showLeagueSelection ? selectedLeague : league} league using {phoneNumber}.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;