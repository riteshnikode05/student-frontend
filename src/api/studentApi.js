import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://student-backend-l4ip.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
};
