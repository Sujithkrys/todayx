'use client';

import React from 'react';
import { Download, Search, ChevronDown } from 'lucide-react';

export default function CallLogsPage() {
  return (
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans p-2">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">Call Logs</h1>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4 text-gray-500" />
          Export
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
            />
          </div>

          {/* Channel Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            Channel
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Status Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            Status
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>

        {/* Date Filter Dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          Last 7 days
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 border border-gray-100 rounded-lg overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-gray-100 bg-white">
          {['CALLER', 'ISSUE', 'CHANNEL', 'DURATION', 'STATUS', 'TICKET', 'DATE'].map((header) => (
            <div
              key={header}
              className="px-4 py-3 text-[11px] font-semibold text-gray-500 tracking-wider"
            >
              {header}
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white min-h-[300px]">
          <span className="text-sm text-gray-500">No call logs found.</span>
        </div>
      </div>
    </div>
  );
}
