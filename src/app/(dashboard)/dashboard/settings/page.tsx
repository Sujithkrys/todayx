import React from 'react';
import { CreditCard, User, Bell, Shield, Download, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans p-6 space-y-8 max-w-5xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar for settings */}
        <div className="space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium bg-gray-100/70 text-gray-900 rounded-md transition-colors">
            <CreditCard className="w-4 h-4" />
            Billing
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
            <Shield className="w-4 h-4" />
            Security
          </button>
        </div>

        {/* Settings Content - Billing */}
        <div className="md:col-span-3 space-y-6 pb-12">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Plan & Billing</h2>
              <p className="text-sm text-gray-500">Manage your subscription and payment methods.</p>
            </div>

            <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">Pro Plan</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-medium backdrop-blur-sm border border-white/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    Active
                  </span>
                </div>
                <p className="text-white/70 text-sm">Next billing on Aug 14, 2026</p>
              </div>
              <button className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Manage Subscription
              </button>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/28</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Edit
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Billing History</h3>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">Jul 14, 2026</td>
                      <td className="px-4 py-3 font-medium text-gray-900">₹2,400.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">Paid</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <Download className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">Jun 14, 2026</td>
                      <td className="px-4 py-3 font-medium text-gray-900">₹2,400.00</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">Paid</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-gray-400 hover:text-gray-900 transition-colors">
                          <Download className="w-4 h-4 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
