'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Stats {
  total: number;
  planning: number;
  in_progress: number;
  completed: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    planning: 0,
    in_progress: 0,
    completed: 0,
  });

  useEffect(() => {
    api.getDashboard().then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-gray-600">Total</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center">
          <p className="text-2xl font-bold">{stats.planning}</p>
          <p className="text-gray-600">Planning</p>
        </div>
        <div className="bg-indigo-100 p-6 rounded-lg text-center">
          <p className="text-2xl font-bold">{stats.in_progress}</p>
          <p className="text-gray-600">In Progress</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <p className="text-2xl font-bold">{stats.completed}</p>
          <p className="text-gray-600">Completed</p>
        </div>
      </div>
    </div>
  );
}