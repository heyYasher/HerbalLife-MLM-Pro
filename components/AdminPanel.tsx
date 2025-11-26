import React, { useState } from 'react';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ADMIN_STATS, MOCK_ORDERS } from '../constants';

export const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium">Total Users</div>
        <div className="text-2xl font-bold text-gray-900">{MOCK_ADMIN_STATS.totalUsers.toLocaleString()}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium">Total Sales</div>
        <div className="text-2xl font-bold text-green-600">₹{MOCK_ADMIN_STATS.totalSales.toLocaleString()}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium">Pending KYC</div>
        <div className="text-2xl font-bold text-orange-500">{MOCK_ADMIN_STATS.pendingKYC}</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-500 text-sm font-medium">Active Distributors</div>
        <div className="text-2xl font-bold text-blue-600">{MOCK_ADMIN_STATS.activeDistributors.toLocaleString()}</div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Product Management</h3>
        <button className="bg-herbal-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Add New Product</button>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">PV</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {MOCK_PRODUCTS.map(p => (
            <tr key={p.id}>
              <td className="px-6 py-4 text-sm text-gray-500">#{p.id}</td>
              <td className="px-6 py-4 font-medium">{p.name}</td>
              <td className="px-6 py-4">₹{p.price}</td>
              <td className="px-6 py-4">{p.pv}</td>
              <td className="px-6 py-4 text-green-600 font-medium">In Stock</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-herbal-600' : 'hover:bg-slate-700'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${activeTab === 'products' ? 'bg-herbal-600' : 'hover:bg-slate-700'}`}>
            <ShoppingBag size={20} /> Products
          </button>
          <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${activeTab === 'users' ? 'bg-herbal-600' : 'hover:bg-slate-700'}`}>
            <Users size={20} /> Users & KYC
          </button>
        </nav>
        <div className="p-4">
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-700 rounded-lg">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{activeTab}</h1>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'users' && <div className="text-gray-500">User Management Module Placeholder</div>}
      </div>
    </div>
  );
};