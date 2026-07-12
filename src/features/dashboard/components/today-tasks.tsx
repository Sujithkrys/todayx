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
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-base leading-none">Today's Tasks</h2>
        <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-medium text-muted-foreground">
          {tasks.filter((t) => !t.completed).length} pending
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between p-3 rounded-lg border bg-background/50 hover:bg-muted/40 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
              ) : (
                <Circle className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
              )}
              <span className={`text-xs font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </span>
            </div>
            
            <span className={`text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded ${
              task.priority === 'high'
                ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20'
                : task.priority === 'medium'
                ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
            }`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
