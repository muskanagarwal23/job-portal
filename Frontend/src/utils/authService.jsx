import axios from 'axios';

const API_URL = '/api/users';

// Add token to all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration globally
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && error.response.data?.shouldLogout) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const verifySession = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/verify-token`);
    return data.user;
  } catch (err) {
    throw err;
  }
};