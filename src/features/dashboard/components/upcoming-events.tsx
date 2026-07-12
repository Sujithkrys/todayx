'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  time: string;
  location?: string;
}

const EVENTS: Event[] = [
  { id: '1', title: 'Voicera Sync Standup', time: '10:00 AM - 10:30 AM', location: 'Zoom Link' },
  { id: '2', title: 'Client Feedback Review', time: '2:00 PM - 3:00 PM', location: 'HQ Conference Room' },
];

export function UpcomingEvents() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[15px] text-gray-900 leading-none">Upcoming Schedule</h2>
        <CalendarIcon className="w-4 h-4 text-gray-400" />
      </div>

      <div className="space-y-4 mt-2">
        {EVENTS.map((event) => (
          <div key={event.id} className="relative pl-4 border-l-2 border-emerald-500 space-y-1">
            <h3 className="text-[13px] font-semibold text-gray-800 leading-snug">{event.title}</h3>
            <div className="flex flex-col gap-1 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
