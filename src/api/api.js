import axios from 'axios';

const API = axios.create({
  baseURL: 'https://church.altoservices.net/api',
});

// Attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle auth failure
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

API.getMembers = () => API.get('/members');
API.createMember = (data) => API.post('/members', data);
API.updateMember = (id, data) => API.put(`/members/${id}`, data);
API.deleteMember = (id) => API.delete(`/members/${id}`);

API.getDonations = () => API.get('/donations');
API.createDonation = (data) => API.post('/donations', data);

API.getWorkers = () => API.get('/workers');
API.createWorker = (data) => API.post('/workers', data);
API.updateWorker = (id, data) => API.put(`/workers/${id}`, data);
API.deleteWorker = (id) => API.delete(`/workers/${id}`);

API.getEvents = () => API.get('/events');
API.createEvent = (data) => API.post('/events', data);
API.updateEvent = (id, data) => API.put(`/events/${id}`, data);
API.deleteEvent = (id) => API.delete(`/events/${id}`);

API.getSermons = () => API.get('/audio');
API.createSermon = (data) => API.post('/audio', data);
API.updateSermon = (id, data) => API.put(`/audio/${id}`, data);
API.deleteSermon = (id) => API.delete(`/audio/${id}`);

API.getRecords = () => API.get('/records');

export default API;
