import React from 'react';
import Header from '../components/Header';

function Admin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600">This page will allow admins to manage invites and verify payments.</p>
      </main>
    </div>
  );
}

export default Admin;