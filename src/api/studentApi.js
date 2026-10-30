import axios from 'axios';

export const CONTAINERS = [
  {
    id: 'c4',
    name: 'Scaled Node 3 (RiteshBIT)',
    url: 'https://riteshbit.onrender.com/api',
    badge: '⚡ RiteshBIT',
  },
  {
    id: 'c3',
    name: 'Scaled Node 2 (StudentManagementSystemRSN)',
    url: 'https://studentmanagementsystemrsn.onrender.com/api',
    badge: '🚀 StudentManagementSystemRSN',
  },
  {
    id: 'c2',
    name: 'Scaled Node 1 (RiteshStudentMsystem)',
    url: 'https://riteshstudentmsystem.onrender.com/api',
    badge: '⚡ RiteshStudentMsystem',
  },
  {
    id: 'c1',
    name: 'Primary Node (student-backend)',
    url: 'https://student-backend-l4ip.onrender.com/api',
    badge: '⚙️ student-backend',
  },
];

let activeContainer = CONTAINERS[0]; // Default to newly created RiteshBIT!

const api = axios.create({
  baseURL: activeContainer.url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setActiveContainer = (containerId) => {
  const found = CONTAINERS.find((c) => c.id === containerId);
  if (found) {
    activeContainer = found;
    api.defaults.baseURL = found.url;
  }
  return activeContainer;
};

export const getActiveContainer = () => activeContainer;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const studentApi = {
  getAll: async () => {
    const { data } = await api.get('/students');
    return data;
  },
  create: async (student) => {
    const { data } = await api.post('/students', student);
    return data;
  },
  update: async (id, student) => {
    const { data } = await api.put(`/students/${id}`, student);
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/students/${id}`);
    return data;
  },
  getSystemInfo: async () => {
    const { data } = await api.get('/system-info');
    return data;
  },
};
