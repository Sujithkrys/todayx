'use client';

import React from 'react';
import { Circle, CheckCircle2, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Verify client calendar invitation mappings', completed: true, priority: 'high' },
  { id: '2', title: 'Setup integration callbacks for Slack channel', completed: false, priority: 'medium' },
  { id: '3', title: 'Optimize agent memory retrieval cache', completed: false, priority: 'low' },
];

export function TodayTasks() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[15px] text-gray-900 leading-none">Today's Tasks</h2>
        <span className="text-[10px] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-500">
          {tasks.filter((t) => !t.completed).length} pending
        </span>
      </div>

      <div className="space-y-0">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-gray-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 shrink-0" />
              )}
              <span className={`text-[13px] font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </div>
            
            <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
              task.priority === 'high'
                ? 'bg-rose-50 text-rose-600 border border-rose-100/50'
                : task.priority === 'medium'
                ? 'bg-amber-50 text-amber-600 border border-amber-100/50'
                : 'bg-gray-50 text-gray-500 border border-gray-100/50'
            }`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
