import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (data: { email?: string; phone?: string; password: string }) =>
    apiClient.post('/auth/login', data),
  register: (data: { email?: string; phone?: string; password: string; role: string }) =>
    apiClient.post('/auth/register', data),
  getMe: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};

// Cities API
export const citiesApi = {
  getPopular: (country: string = 'IQ') =>
    apiClient.get(`/cities/popular?country=${country}`),
  search: (query: string) =>
    apiClient.get(`/cities/search?q=${encodeURIComponent(query)}`),
  detectByIp: () =>
    apiClient.get('/geo/detect'),
};

// Candidate API
export const candidateApi = {
  getProfile: () => apiClient.get('/candidate/profile'),
  updateProfile: (data: any) => apiClient.put('/candidate/profile', data),
  updateContacts: (data: any) => apiClient.put('/candidate/contacts', data),
  addEducation: (data: any) => apiClient.post('/candidate/education', data),
  deleteEducation: (id: string) => apiClient.delete(`/candidate/education/${id}`),
  updateDriving: (data: any) => apiClient.put('/candidate/driving', data),
  addExperience: (data: any) => apiClient.post('/candidate/experience', data),
  updateExperience: (id: string, data: any) =>
    apiClient.put(`/candidate/experience/${id}`, data),
  deleteExperience: (id: string) => apiClient.delete(`/candidate/experience/${id}`),
};

// Employer API
export const employerApi = {
  getBalance: () => apiClient.get('/employer/balance'),
  topup: (data: { amount: number }) => apiClient.post('/employer/topup', data),
  saveCard: (data: { cardToken: string }) => apiClient.post('/employer/cards', data),
  getCards: () => apiClient.get('/employer/cards'),
  unlockCandidate: (candidateId: string) =>
    apiClient.post(`/candidates/${candidateId}/unlock`),
};

// Search API
export const searchApi = {
  searchCandidates: (params: any) =>
    apiClient.get('/candidates/search', { params }),
  getCandidate: (id: string) =>
    apiClient.get(`/candidates/${id}`),
};
