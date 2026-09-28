'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Project {
  id: number;
  name: string;
  status: string;
  risk_score: number;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const res = await api.getProjects();
    setProjects(res.data);
  }

  async function addProject() {
    if (!newProject.trim()) return;
    setLoading(true);
    await api.addProject({ name: newProject, status: 'Planning' });
    setNewProject('');
    await loadProjects();
    setLoading(false);
  }

  async function deleteProject(id: number) {
    if (!confirm('Delete this project?')) return;
    await api.deleteProject(id);
    await loadProjects();
  }

  async function updateStatus(id: number, status: string) {
    await api.updateStatus(id, status);
    await loadProjects();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📋 Project Monitoring</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Enter project name..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addProject()}
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={addProject}
          disabled={loading}
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded"
          >
            <div>
              <span className="font-medium text-black">{project.name}</span>
              <span
                className={`ml-3 px-2 py-1 text-sm rounded ${
                  project.status === 'Planning'
                    ? 'bg-yellow-200'
                    : project.status === 'In Progress'
                    ? 'bg-blue-200'
                    : 'bg-green-200'
                }`}
              >
                {project.status}
              </span>
              <span className="ml-3 text-sm text-gray-600">
                Risk: {project.risk_score}/10
              </span>
            </div>
            <div className="flex gap-2">
              <select
                className="px-2 py-1 border rounded text-sm text-black"
                value={project.status}
                onChange={(e) => updateStatus(project.id, e.target.value)}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No projects yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
}