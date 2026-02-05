import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Send cookies with requests
});

// Response interceptor to handle 401s (optional but good practice)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      // window.location.href = '/admin/login'; // Be careful with loops
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (credentials: any) => api.post('/auth/register', credentials),
  logout: () => api.post('/auth/logout'),
  checkAuth: () => api.get('/auth/check'),
};

export const content = {
  getHero: () => api.get('/hero'),
  updateHero: (data: FormData) => api.put('/hero', data),

  getFeatures: () => api.get('/features'),
  createFeature: (data: any) => api.post('/features', data),
  updateFeature: (id: string, data: any) => api.put(`/features/${id}`, data),
  deleteFeature: (id: string) => api.delete(`/features/${id}`),

  getPrograms: () => api.get('/programs'),
  createProgram: (data: any) => api.post('/programs', data),
  updateProgram: (id: string, data: any) => api.put(`/programs/${id}`, data),
  deleteProgram: (id: string) => api.delete(`/programs/${id}`),

  getCoaches: () => api.get('/coaches'),
  createCoach: (data: FormData) => api.post('/coaches', data),
  updateCoach: (id: string, data: FormData) => api.put(`/coaches/${id}`, data),
  deleteCoach: (id: string) => api.delete(`/coaches/${id}`),

  getPricing: () => api.get('/pricing'),
  createPricing: (data: any) => api.post('/pricing', data),
  updatePricing: (id: string, data: any) => api.put(`/pricing/${id}`, data),
  deletePricing: (id: string) => api.delete(`/pricing/${id}`),
  
  getPersonalTraining: () => api.get('/personal-training'),
  createPersonalTraining: (data: any) => api.post('/personal-training', data),
  updatePersonalTraining: (id: string, data: any) => api.put(`/personal-training/${id}`, data),
  deletePersonalTraining: (id: string) => api.delete(`/personal-training/${id}`),

  getTestimonials: () => api.get('/testimonials'),
  createTestimonial: (data: FormData) => api.post('/testimonials', data),
  updateTestimonial: (id: string, data: FormData) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete(`/testimonials/${id}`),

  getBMI: () => api.get('/bmi'),
  updateBMI: (data: any) => api.put('/bmi', data),

  getCTABanner: () => api.get('/cta-banner'),
  updateCTABanner: (data: any) => api.put('/cta-banner', data),

  getFooter: () => api.get('/footer'),
  updateFooter: (data: any) => api.put('/footer', data),

  // Contact
  submitContact: (data: any) => api.post('/contact', data),
  getContactSubmissions: () => api.get('/contact'),

  // Section Headers
  getSection: (name: string) => api.get(`/section/${name}`),
  updateSection: (name: string, data: any) => api.put(`/section/${name}`, data),

  // Blog
  getBlogPosts: () => api.get('/blog'),
  createBlogPost: (data: FormData) => api.post('/blog', data),
  updateBlogPost: (id: string, data: FormData) => api.put(`/blog/${id}`, data),
  deleteBlogPost: (id: string) => api.delete(`/blog/${id}`),
  getBlogPost: (id: string) => api.get(`/blog/${id}`), // Single post for frontend
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; // For images
export default api;
