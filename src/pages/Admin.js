import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import Header from '../components/Header';

function Admin() {
  const { user, invites, setInvites, paymentHistory, setPaymentHistory } = useContext(UserContext);
  const navigate = useNavigate();
  const [newInvite, setNewInvite] = useState({ league: '', email: '' });

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-800">Access Denied</h2>
        <p className="text-sm text-gray-600">You must be an admin to access this page.</p>
      </div>
    );
  }

  const handleGenerateInvite = (e) => {
    e.preventDefault();
    if (!newInvite.league || !newInvite.email) {
      toast.error('Please select a league and enter an email.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const newCode = `${newInvite.league.toUpperCase().slice(0, 3)}2025`;
    const invite = {
      id: invites.length + 1,
      league: newInvite.league,
      code: newCode,
      email: newInvite.email,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setInvites([...invites, invite]);
    setNewInvite({ league: '', email: '' });
    toast.success(`Invite generated for ${newInvite.email} to join ${newInvite.league}! Code: ${newCode}`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleVerifyPayment = (paymentId) => {
    const updatedPayments = paymentHistory.map((payment) =>
      payment.id === paymentId ? { ...payment, status: 'Completed' } : payment
    );
    setPaymentHistory(updatedPayments);
    toast.success('Payment verified successfully.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleRejectPayment = (paymentId) => {
    const updatedPayments = paymentHistory.map((payment) =>
      payment.id === paymentId ? { ...payment, status: 'Failed' } : payment
    );
    setPaymentHistory(updatedPayments);
    toast.error('Payment rejected.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>

        {/* 1. Generate Invite */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-4">Generate Invite</h3>
          <form onSubmit={handleGenerateInvite}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">League</label>
                <select
                  value={newInvite.league}
                  onChange={(e) => setNewInvite({ ...newInvite, league: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">-- Select a League --</option>
                  <option value="Madaraka">Madaraka</option>
                  <option value="Taifa">Taifa</option>
                  <option value="Umoja">Umoja</option>
                  <option value="Jamhuri">Jamhuri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                  placeholder="Enter user email"
                  className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Generate Invite
            </button>
          </form>
        </section>

        {/* 2. Manage Invites */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-4">Manage Invites</h3>
          {invites.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">League</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Code</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Email</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Status</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {invites.map((invite) => (
                    <tr key={invite.id} className="border-b">
                      <td className="p-2 text-sm sm:text-base">{invite.league}</td>
                      <td className="p-2 text-sm sm:text-base">{invite.code}</td>
                      <td className="p-2 text-sm sm:text-base">{invite.email}</td>
                      <td className="p-2 text-sm sm:text-base">
                        <span
                          className={
                            invite.status === 'Accepted'
                              ? 'text-green-600'
                              : invite.status === 'Pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }
                        >
                          {invite.status}
                        </span>
                      </td>
                      <td className="p-2 text-sm sm:text-base">{invite.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No invites have been generated.</p>
          )}
        </section>

        {/* 3. Verify Payments */}
        <section className="bg-white rounded-lg shadow p-4 sm:p-6 mb-4">
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-4">Verify Payments</h3>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">User</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">League</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Amount</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Date</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Transaction ID</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Status</th>
                    <th className="p-2 text-sm sm:text-base font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-2 text-sm sm:text-base">{payment.userName}</td>
                      <td className="p-2 text-sm sm:text-base">{payment.league}</td>
                      <td className="p-2 text-sm sm:text-base">KSH {payment.amount.toLocaleString()}</td>
                      <td className="p-2 text-sm sm:text-base">{payment.date}</td>
                      <td className="p-2 text-sm sm:text-base">{payment.transactionId}</td>
                      <td className="p-2 text-sm sm:text-base">
                        <span
                          className={
                            payment.status === 'Completed'
                              ? 'text-green-600'
                              : payment.status === 'Pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-2 text-sm sm:text-base">
                        {payment.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerifyPayment(payment.id)}
                              className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs sm:text-sm"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleRejectPayment(payment.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs sm:text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No payments to verify.</p>
          )}
        </section>
      </main>
    </div>
  );
}
export default Admin;