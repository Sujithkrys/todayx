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
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-base leading-none">Upcoming Schedule</h2>
        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {EVENTS.map((event) => (
          <div key={event.id} className="relative pl-4 border-l-2 border-primary space-y-1">
            <h3 className="text-xs font-semibold text-foreground leading-snug">{event.title}</h3>
            <div className="flex flex-col gap-0.5 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
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
