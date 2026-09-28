import axios from 'axios';

const API = 'http://localhost:8000';

export const api = {
  getProjects: () => axios.get(`${API}/projects`),
  addProject: (data: { name: string; status: string }) =>
    axios.post(`${API}/projects`, data),
  updateStatus: (id: number, status: string) =>
    axios.put(`${API}/projects/${id}`, { status }),
  deleteProject: (id: number) =>
    axios.delete(`${API}/projects/${id}`),
  getDashboard: () => axios.get(`${API}/dashboard`),
};